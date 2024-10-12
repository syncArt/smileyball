mod contest_data;
pub mod song;

use contest_data::{ContestData, ContestError};
use song::{Song, SongError};
use std::collections::hash_map::Entry;
use std::{cell::RefCell, collections::HashMap};

thread_local! {
    static SONGS: RefCell<HashMap<u32, Song>> = RefCell::default();
    static CONTESTS: RefCell<HashMap<String, ContestData>> = RefCell::default();
}

#[ic_cdk::query]
fn get_contests() -> HashMap<String, ContestData> {
    CONTESTS.with_borrow(|contests| contests.clone())
}

#[ic_cdk::query]
fn get_contest_by_id(contest_id: String) -> Result<ContestData, ContestError> {
    CONTESTS.with_borrow(|contests| {
        if let Some(contest) = contests.get(&contest_id) {
            Ok(contest.clone())
        } else {
            Err(ContestError::KeyNotFound)
        }
    })
}

#[ic_cdk::update]
fn create_contest(contest_id: String, new_contest: ContestData) -> Result<String, ContestError> {
    CONTESTS.with_borrow(|contests| {
        if contests.contains_key(&contest_id) {
            return Err(ContestError::DuplicateContest);
        }
        Ok(())
    })?;

    CONTESTS.with_borrow_mut(|contests| {
        contests.insert(contest_id.clone(), new_contest);
    });

    Ok(contest_id)
}

#[ic_cdk::update]
fn remove_contest(contest_id: String) -> Result<(), ContestError> {
    CONTESTS.with_borrow_mut(|contests| match contests.remove(&contest_id) {
        Some(_) => Ok(()),
        None => Err(ContestError::KeyNotFound),
    })
}

#[ic_cdk::update]
fn update_contest(contest_id: String, updated_contest: ContestData) -> Result<(), ContestError> {
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
    SONGS.with_borrow_mut(|songs| match songs.entry(new_song.spotify_song_id) {
        Entry::Vacant(entry) => {
            entry.insert(new_song);
            Ok(())
        }
        Entry::Occupied(_) => Err(SongError::DuplicateSong),
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

// Enable Candid export
ic_cdk::export_candid!();
