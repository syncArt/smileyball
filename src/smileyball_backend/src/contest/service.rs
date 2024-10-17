use crate::contest::model::{ContestData, ContestError};
use crate::contest::repository;
use crate::utils::generate_random_id;
use std::collections::HashMap;

pub async fn create_contest(new_contest: ContestData) -> Result<u64, ContestError> {
    let contest_id = generate_random_id()
        .await
        .map_err(|_| ContestError::KeyNotFound)?;
    if repository::get_contest_by_id(contest_id).is_ok() {
        return Err(ContestError::DuplicateContest);
    }
    repository::create_contest(contest_id, new_contest)
}

pub fn get_all_contests() -> Result<HashMap<u64, ContestData>, ContestError> {
    repository::get_contests()
}

pub fn get_contest_by_id(contest_id: u64) -> Result<ContestData, ContestError> {
    repository::get_contest_by_id(contest_id)
}

pub fn remove_contest(contest_id: u64) -> Result<(), ContestError> {
    if repository::get_contest_by_id(contest_id).is_err() {
        return Err(ContestError::KeyNotFound);
    }
    repository::remove_contest(contest_id)
}

pub fn update_contest(contest_id: u64, updated_contest: ContestData) -> Result<(), ContestError> {
    if repository::get_contest_by_id(contest_id).is_err() {
        return Err(ContestError::KeyNotFound);
    }
    repository::update_contest(contest_id, updated_contest)
}
