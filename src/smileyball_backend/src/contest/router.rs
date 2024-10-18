use crate::contest::model::{
    ContestData, ContestError, CreateContest, LobbySongData, Status, Vote,
};
use crate::contest::service;
use std::collections::HashMap;

#[ic_cdk::query(name = "contest_get_get_contest")]
pub fn get_contests() -> Result<HashMap<u64, ContestData>, ContestError> {
    service::get_all_contests()
}

#[ic_cdk::update(name = "contest_update_create_contest")]
pub async fn create_contest(new_contest: CreateContest) -> Result<u64, ContestError> {
    service::create_contest(new_contest).await
}

#[ic_cdk::query(name = "contest_get_get_contest_by_id")]
pub fn get_contest_by_id(contest_id: u64) -> Result<ContestData, ContestError> {
    service::get_contest_by_id(contest_id)
}

#[ic_cdk::update(name = "contest_update_remove_contest")]
pub fn remove_contest(contest_id: u64) -> Result<(), ContestError> {
    service::remove_contest(contest_id)
}

#[ic_cdk::update(name = "contest_update_update_stage")]
pub fn update_contest_stage(contest_id: u64, new_stage: Status) -> Result<(), ContestError> {
    service::update_contest_stage(contest_id, new_stage)
}

#[ic_cdk::update(name = "contest_update_add_song_to_lobby")]
pub fn add_song_to_lobby(contest_id: u64, song_id: u32) -> Result<(), ContestError> {
    let added_by = ic_cdk::api::caller();
    let song_data = LobbySongData::new(added_by);
    service::add_song_to_lobby(contest_id, song_id, song_data)
}

#[ic_cdk::update(name = "contest_update_add_jury_vote")]
pub fn add_jury_vote(contest_id: u64, song_id: u32, vote: Vote) -> Result<(), ContestError> {
    let jury_member = ic_cdk::api::caller();
    let mut contest = service::get_contest_by_id(contest_id)?;

    if let Some(lobby_songs) = &mut contest.lobby_songs {
        if let Some(song) = lobby_songs.get_mut(&song_id) {
            song.jury_votes.insert(jury_member, vote);
            return service::update_lobby_song_vote(contest_id, song_id, song.clone());
        }
    }

    service::add_jury_vote(contest_id, jury_member, song_id, vote)
}

#[ic_cdk::update(name = "contest_update_add_public_vote")]
pub fn add_public_vote(contest_id: u64, song_id: u32, vote: Vote) -> Result<(), ContestError> {
    service::add_public_vote(contest_id, song_id, vote)
}

#[ic_cdk::update(name = "contest_update_finalize_contest")]
pub fn finalize_contest(contest_id: u64) -> Result<(), ContestError> {
    service::finalize_contest(contest_id)
}
