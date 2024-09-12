mod contest_data;
pub mod user;

use candid::Principal;
use contest_data::{ContestData, ContestError};
use ic_cdk::caller;
use std::{cell::RefCell, collections::HashMap};
use user::User;

thread_local! {
    static CONTESTS: RefCell<HashMap<u32, ContestData>> = RefCell::default();
    static USERS: RefCell<HashMap<Principal, User>> = RefCell::default();
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::update]
fn register_user(nickname: String) {
    let user = caller();

    if user == Principal::anonymous() {
        panic!("User is anonymous Principal");
    }

    USERS.with_borrow_mut(|users| users.insert(user, User::new(nickname)));
}

#[ic_cdk::update]
fn create_contest(new_contest: ContestData) -> Result<ContestData, ContestError> {
    CONTESTS.with_borrow(|contests| {
        if contests.contains_key(&new_contest.contest_id) {
            return Err(ContestError::DuplicateContest);
        }
        Ok(())
    })?;

    CONTESTS.with_borrow_mut(|contests| {
        contests.insert(new_contest.contest_id.clone(), new_contest.clone());
    });

    Ok(new_contest)
}

#[cfg(test)]
mod tests {
    use chrono::Utc;
    use user::User;

    use super::*;

    #[test]
    fn first_pipeline_test() {
        assert_eq!(greet(String::from("Pablo")), "Hello, Pablo!");
    }

    #[test]
    fn user_creation_should_succeed() {
        let user = User::new(String::from("test_username"));

        let test_username = String::from("test_username");
        let is_user_admin = false;
        let present_date = Utc::now();

        assert_eq!(test_username, user.username);
        assert_eq!(is_user_admin, user.is_admin);
        assert!(user.created_at <= present_date);
    }
}
