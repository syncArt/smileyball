use crate::contest::model::contest::{ContestData, CreateContest};
use crate::contest::model::error::ContestError;
use crate::contest::model::stage::Status;
use crate::contest::repository;
use crate::utils::generate_random_id;
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

    if let (Some(min), Some(max)) = (new_contest.min_songs_amount, new_contest.max_songs_amount) {
        if min >= max {
            return Err(ContestError::InvalidSongAmountRange);
        }
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
