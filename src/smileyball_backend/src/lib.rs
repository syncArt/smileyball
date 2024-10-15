mod contest_data;
mod utils;

pub mod song;

use crate::utils::generate_random_id;
use contest_data::{ContestData, ContestError};
use song::Song;
use std::{cell::RefCell, collections::HashMap};

thread_local! {
    static SONGS: RefCell<HashMap<u32, Song>> = RefCell::default();
    static CONTESTS: RefCell<HashMap<u64, ContestData>> = RefCell::default();
}

#[ic_cdk::query]
fn get_contests() -> Result<HashMap<u64, ContestData>, ContestError> {
    Ok(CONTESTS.with(|contests| contests.borrow().clone()))
}

#[ic_cdk::query]
fn get_contest_by_id(contest_id: u64) -> Result<ContestData, ContestError> {
    CONTESTS.with(|contests| {
        if let Some(contest) = contests.borrow().get(&contest_id) {
            Ok(contest.clone())
        } else {
            Err(ContestError::KeyNotFound)
        }
    })
}

#[ic_cdk::update]
async fn create_contest(new_contest: ContestData) -> Result<u64, ContestError> {
    let contest_id = generate_random_id().await.map_err(|msg| {
        ic_cdk::println!(
            "Failed to create contest due to random ID generation error: {}",
            msg
        );
        ContestError::KeyNotFound
    })?;

    CONTESTS.with(|contests| {
        if contests.borrow().contains_key(&contest_id) {
            return Err(ContestError::DuplicateContest);
        }
        Ok(())
    })?;

    CONTESTS.with(|contests| {
        contests.borrow_mut().insert(contest_id, new_contest);
    });

    Ok(contest_id)
}

#[ic_cdk::update]
fn remove_contest(contest_id: u64) -> Result<(), ContestError> {
    CONTESTS.with(|contests| match contests.borrow_mut().remove(&contest_id) {
        Some(_) => Ok(()),
        None => Err(ContestError::KeyNotFound),
    })
}

#[ic_cdk::update]
fn update_contest(contest_id: u64, updated_contest: ContestData) -> Result<(), ContestError> {
    let map_contains_key = CONTESTS.with(|contests| contests.borrow().contains_key(&contest_id));

    if !map_contains_key {
        return Err(ContestError::KeyNotFound);
    }
    CONTESTS.with(|contests| contests.borrow_mut().insert(contest_id, updated_contest));

    Ok(())
}

ic_cdk::export_candid!();
