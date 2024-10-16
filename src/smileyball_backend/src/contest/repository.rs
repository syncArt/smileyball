use crate::contest::model::{ContestData, ContestError};
use std::collections::HashMap;

pub fn get_contests() -> Result<HashMap<u64, ContestData>, ContestError> {
    crate::with_contests(|contests| Ok(contests.borrow().clone()))
}

pub fn get_contest_by_id(contest_id: u64) -> Result<ContestData, ContestError> {
    crate::with_contests(|contests| {
        let contests = contests.borrow();
        if let Some(contest) = contests.get(&contest_id) {
            Ok(contest.clone())
        } else {
            Err(ContestError::KeyNotFound)
        }
    })
}

pub fn create_contest(contest_id: u64, new_contest: ContestData) -> Result<u64, ContestError> {
    crate::with_contests(|contests| {
        let mut contests = contests.borrow_mut();
        if contests.contains_key(&contest_id) {
            return Err(ContestError::DuplicateContest);
        }
        contests.insert(contest_id, new_contest);
        Ok(contest_id)
    })
}

pub fn remove_contest(contest_id: u64) -> Result<(), ContestError> {
    crate::with_contests(|contests| {
        if contests.borrow_mut().remove(&contest_id).is_some() {
            Ok(())
        } else {
            Err(ContestError::KeyNotFound)
        }
    })
}

pub fn update_contest(contest_id: u64, updated_contest: ContestData) -> Result<(), ContestError> {
    crate::with_contests(|contests| {
        if contests.borrow().contains_key(&contest_id) {
            contests.borrow_mut().insert(contest_id, updated_contest);
            Ok(())
        } else {
            Err(ContestError::KeyNotFound)
        }
    })
}
