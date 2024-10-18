use crate::contest::model::error::ContestError;
use crate::management::model::{ContestStage, UserRole};
use crate::management::service;
use std::str::FromStr;

impl FromStr for ContestStage {
    type Err = String;

    fn from_str(input: &str) -> Result<Self, Self::Err> {
        match input {
            "waiting" => Ok(ContestStage::Waiting),
            "lobby" => Ok(ContestStage::Lobby),
            "jury" => Ok(ContestStage::Jury),
            "live" => Ok(ContestStage::Live),
            "finished" => Ok(ContestStage::Finished),
            "paid" => Ok(ContestStage::Paid),
            "canceled" => Ok(ContestStage::Canceled),
            "archived" => Ok(ContestStage::Archived),
            _ => Err("Invalid stage provided".to_string()),
        }
    }
}

impl FromStr for UserRole {
    type Err = String;

    fn from_str(input: &str) -> Result<Self, Self::Err> {
        match input {
            "super_admin" => Ok(UserRole::SuperAdmin),
            "admin" => Ok(UserRole::Admin),
            "jury" => Ok(UserRole::Jury),
            _ => Err("Invalid role provided".to_string()),
        }
    }
}

#[ic_cdk::update(name = "management_update_process_next")]
pub fn process_next(contest_id: u64) -> Result<(), ContestError> {
    service::process_next(contest_id)
}

#[ic_cdk::query(name = "management_get_current_stage")]
pub fn get_current_stage(contest_id: u64) -> Result<ContestStage, ContestError> {
    service::get_current_stage(contest_id)
}
