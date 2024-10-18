use crate::contest::model::contest::{ContestData, CreateContest};
use crate::contest::model::error::{ContestError, UpdateError};
use crate::contest::model::stage::Status;
use crate::contest::model::vote::LobbySongData;
use crate::contest::repository;
use crate::management::model::ContestStage;
use crate::utils::{generate_random_id, validate_stage};
use crate::with_management;
use std::collections::HashMap;

pub fn get_all_contests() -> Result<HashMap<u64, ContestData>, ContestError> {
    repository::get_contests()
}

pub fn get_contest_by_id(contest_id: u64) -> Result<ContestData, ContestError> {
    repository::get_contest_by_id(contest_id)
}

pub async fn create_contest(new_contest: CreateContest) -> Result<u64, ContestError> {
    let contest_id = generate_random_id()
        .await
        .map_err(|_| ContestError::KeyNotFound)?;

    if repository::get_contest_by_id(contest_id).is_ok() {
        return Err(ContestError::DuplicateContest);
    }

    let contest_data = ContestData::new_initial(new_contest);

    repository::create_contest(contest_id, contest_data)?;

    with_management(|management| {
        management
            .borrow_mut()
            .contest_stages
            .waiting
            .push(contest_id);
    });

    Ok(contest_id)
}

pub fn remove_contest(contest_id: u64) -> Result<(), ContestError> {
    if repository::get_contest_by_id(contest_id).is_err() {
        return Err(ContestError::KeyNotFound);
    }
    repository::remove_contest(contest_id)
}

pub fn update_contest_status(contest_id: u64, new_status: Status) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;
    contest.status = Some(new_status);
    repository::update_contest(contest_id, contest)
}

pub fn add_song_to_lobby(
    contest_id: u64,
    song_id: u32,
    song_data: LobbySongData,
) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;

    if contest.optional_stages.lobby {
        validate_stage(contest_id, vec![ContestStage::Lobby])?;
    } else {
        validate_stage(contest_id, vec![ContestStage::Waiting])?;
    }

    contest
        .add_song_to_lobby(song_id, song_data)
        .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
    repository::update_contest(contest_id, contest)
}
