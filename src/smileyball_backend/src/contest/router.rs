use crate::contest::model::{ContestData, ContestError};
use crate::contest::service;
use std::collections::HashMap;

#[ic_cdk::query]
pub fn get_contests() -> Result<HashMap<u64, ContestData>, ContestError> {
    service::get_all_contests()
}

#[ic_cdk::update]
pub async fn create_contest(new_contest: ContestData) -> Result<u64, ContestError> {
    service::create_contest(new_contest).await
}

#[ic_cdk::query]
pub fn get_contest_by_id(contest_id: u64) -> Result<ContestData, ContestError> {
    service::get_contest_by_id(contest_id)
}

#[ic_cdk::update]
pub fn remove_contest(contest_id: u64) -> Result<(), ContestError> {
    service::remove_contest(contest_id)
}

#[ic_cdk::update]
pub fn update_contest(contest_id: u64, updated_contest: ContestData) -> Result<(), ContestError> {
    service::update_contest(contest_id, updated_contest)
}

ic_cdk::export_candid!();
