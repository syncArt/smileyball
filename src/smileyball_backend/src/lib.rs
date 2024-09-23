mod contest_data;
pub mod song;
pub mod user;

use candid::Principal;
use contest_data::{ContestData, ContestError};
use ic_cdk::caller;
use song::{Song, SongError};
use std::{cell::RefCell, collections::HashMap};
use user::User;

thread_local! {
    static SONGS: RefCell<HashMap<u32, Song>> = RefCell::default();
    static CONTESTS: RefCell<HashMap<u32, ContestData>> = RefCell::default();
    static USERS: RefCell<HashMap<Principal, User>> = RefCell::default();
}

#[ic_cdk::update]
fn register_user(nickname: String) {
    let user = caller();

    if user == Principal::anonymous() {
        panic!("User is anonymous Principal");
    }

    USERS.with_borrow_mut(|users| users.insert(user, User::new(nickname)));
}

#[ic_cdk::query]
fn get_contests() -> HashMap<u32, ContestData> {
    CONTESTS.with_borrow(|contests| contests.clone())
}

#[ic_cdk::query]
fn get_contests_by_id(contest_id: u32) -> Result<ContestData, ContestError> {
    CONTESTS.with_borrow(|contests| {
        if let Some(contest) = contests.get(&contest_id) {
            Ok(contest.clone())
        } else {
            Err(ContestError::KeyNotFound)
        }
    })
}

#[ic_cdk::update]
fn create_contest(new_contest: ContestData) -> Result<(), ContestError> {
    CONTESTS.with_borrow(|contests| {
        if contests.contains_key(&new_contest.contest_id) {
            return Err(ContestError::DuplicateContest);
        }
        Ok(())
    })?;

    Ok(CONTESTS.with_borrow_mut(|contests| {
        contests.insert(new_contest.contest_id.clone(), new_contest.clone());
    }))
}

#[ic_cdk::update]
fn remove_contest(contest_id: u32) -> Result<(), ContestError> {
    CONTESTS.with_borrow_mut(|contests| match contests.remove(&contest_id) {
        Some(_) => Ok(()),
        None => Err(ContestError::KeyNotFound),
    })
}

#[ic_cdk::update]
fn update_contest(contest_id: u32, updated_contest: ContestData) -> Result<(), ContestError> {
    let map_contains_key = CONTESTS.with_borrow(|contests| contests.contains_key(&contest_id));

    if !map_contains_key {
        return Err(ContestError::KeyNotFound);
    }
    CONTESTS.with_borrow_mut(|contests| contests.insert(contest_id, updated_contest));

    Ok(())
}

// SONGS hashmap CRUD

#[ic_cdk::query]
fn get_songs() -> HashMap<u32, Song> {
    SONGS.with_borrow(|songs| songs.clone())
}

#[ic_cdk::query]
fn get_song_by_id(song_id: u32) -> Result<Song, SongError> {
    SONGS.with_borrow(|songs| {
        if let Some(song) = songs.get(&song_id) {
            Ok(song.clone())
        } else {
            Err(SongError::SongNotFound)
        }
    })
}

#[ic_cdk::update]
fn add_song(new_song: Song) -> Result<(), SongError> {
    SONGS.with_borrow_mut(|songs| {
        if !songs.contains_key(&new_song.spotify_song_id) {
            songs.insert(new_song.spotify_song_id, new_song);
            Ok(())
        } else {
            Err(SongError::DuplicateSong)
        }
    })
}

#[ic_cdk::update]
fn remove_song(song_id: u32) -> Result<(), String> {
    SONGS.with_borrow_mut(|songs| match songs.remove(&song_id) {
        Some(_) => Ok(()),
        None => Err(String::from(
            "Cannot remove the song, this item doesn't exist",
        )),
    })
}

#[ic_cdk::update]
fn update_song(song_id: u32, updated_song: Song) -> Result<(), String> {
    let map_contains_song = SONGS.with_borrow(|songs| songs.contains_key(&song_id));

    if !map_contains_song {
        return Err(format!("Song with id: {} doesn't exist", song_id));
    }

    SONGS.with_borrow_mut(|songs| songs.insert(song_id, updated_song));

    Ok(())
}

#[cfg(test)]
mod tests {
    use ic_cdk::api::time;
    use user::User;

    use super::*;

    #[test]
    fn user_creation_should_succeed() {
        let user = User::new(String::from("test_username"));

        let test_username = String::from("test_username");
        let is_user_admin = false;
        let present_date = time();

        assert_eq!(test_username, user.username);
        assert_eq!(is_user_admin, user.is_admin);
        assert!(user.created_at <= present_date);
    }
}

// Enable Candid export
ic_cdk::export_candid!();
