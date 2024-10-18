use crate::contest::model::{
    ContestData, ContestError, CreateContest, LobbySongData, Status, UpdateError, Vote,
};
use crate::contest::repository;
use crate::utils::generate_random_id;
use candid::Principal;
use std::collections::HashMap;

pub async fn create_contest(new_contest: CreateContest) -> Result<u64, ContestError> {
    let contest_id = generate_random_id()
        .await
        .map_err(|_| ContestError::KeyNotFound)?;
    if repository::get_contest_by_id(contest_id).is_ok() {
        return Err(ContestError::DuplicateContest);
    }

    let contest_data =
        ContestData::new_initial(new_contest.contest_title, new_contest.contest_description);
    repository::create_contest(contest_id, contest_data)
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

pub fn update_contest_stage(contest_id: u64, new_stage: Status) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;
    contest.status = Some(new_stage);
    repository::update_contest(contest_id, contest)
}

pub fn add_song_to_lobby(
    contest_id: u64,
    song_id: u32,
    song_data: LobbySongData,
) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;
    contest
        .add_song_to_lobby(song_id, song_data)
        .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
    repository::update_contest(contest_id, contest)
}

pub fn add_jury_vote(
    contest_id: u64,
    jury_member: Principal,
    song_id: u32,
    vote: Vote,
) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;
    contest
        .add_jury_vote(jury_member, song_id, vote)
        .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;

    if let Some(jury) = &contest.jury {
        if !jury.contains(&jury_member) {
            contest
                .add_jury_member(jury_member)
                .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
        }
    } else {
        contest
            .add_jury_member(jury_member)
            .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
    }

    repository::update_contest(contest_id, contest)
}

pub fn add_public_vote(contest_id: u64, song_id: u32, vote: Vote) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;
    contest
        .add_public_vote(ic_cdk::caller(), song_id, vote)
        .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
    repository::update_contest(contest_id, contest)
}

pub fn finalize_contest(contest_id: u64) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;
    contest
        .finalize_contest()
        .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
    repository::update_contest(contest_id, contest)
}

pub fn update_lobby_song_vote(
    contest_id: u64,
    song_id: u32,
    updated_song: LobbySongData,
) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;

    if let Some(ref mut lobby_songs) = contest.lobby_songs {
        lobby_songs.insert(song_id, updated_song);
    } else {
        let mut new_lobby_songs = HashMap::new();
        new_lobby_songs.insert(song_id, updated_song);
        contest.lobby_songs = Some(new_lobby_songs);
    }

    repository::update_contest(contest_id, contest)
}
