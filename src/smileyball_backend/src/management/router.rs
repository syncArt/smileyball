use crate::management::model::{ContestStage, UserRole};
use crate::management::service::{
    add_restricted_method, assign_role, change_contest_stage, check_permission, remove_role,
};
use candid::Principal;
use ic_cdk::api;
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

#[ic_cdk::update]
pub fn update_contest_stage(stage: String, contest_id: u64) -> Result<(), String> {
    let caller = api::caller();
    let stage_enum = stage
        .parse::<ContestStage>()
        .map_err(|_| "Invalid stage provided".to_string())?;
    change_contest_stage(stage_enum, contest_id, caller)
}

#[ic_cdk::update]
pub fn add_role(role: String, principal: Principal) -> Result<(), String> {
    let caller = api::caller();
    let role_enum = role
        .parse::<UserRole>()
        .map_err(|_| "Invalid role provided".to_string())?;
    assign_role(role_enum, principal, caller)
}

#[ic_cdk::update]
pub fn remove_role_api(role: String, principal: Principal) -> Result<(), String> {
    let caller = api::caller();
    let role_enum = role
        .parse::<UserRole>()
        .map_err(|_| "Invalid role provided".to_string())?;
    remove_role(role_enum, principal, caller)
}

#[ic_cdk::update]
pub fn add_restricted_method_api(method_name: String, roles: Vec<String>) -> Result<(), String> {
    let caller = api::caller();
    let roles_enum: Result<Vec<UserRole>, String> = roles
        .iter()
        .map(|role| {
            role.parse::<UserRole>()
                .map_err(|_| "Invalid role provided".to_string())
        })
        .collect();
    add_restricted_method(method_name, roles_enum?, caller)
}

#[ic_cdk::query]
pub fn check_user_permission(method_name: String) -> bool {
    let caller = api::caller();
    check_permission(&method_name, caller)
}
