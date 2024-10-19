use crate::contest::model::contest::{ContestData, CreateContest};
use crate::contest::model::error::ContestError;
use crate::contest::model::stage::Status;
use crate::contest::model::vote::{LobbySongData, Vote};
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

#[ic_cdk::update(name = "contest_update_update_status")]
pub fn update_contest_status(contest_id: u64, new_status: Status) -> Result<(), ContestError> {
    service::update_contest_status(contest_id, new_status)
}

#[ic_cdk::update(name = "contest_update_add_single_song_to_lobby")]
pub fn add_single_song_to_lobby(contest_id: u64, song_id: u32) -> Result<(), ContestError> {
    let added_by = ic_cdk::api::caller();
    let song_data = LobbySongData::new(added_by);
    service::add_single_song_to_lobby(contest_id, song_id, song_data)
}

#[ic_cdk::update(name = "contest_update_add_multiple_songs_to_lobby")]
pub fn add_multiple_songs_to_lobby(
    contest_id: u64,
    song_ids: Vec<u32>,
) -> Result<(), ContestError> {
    let added_by = ic_cdk::api::caller();
    service::add_multiple_songs_to_lobby(contest_id, song_ids, added_by)
}

#[ic_cdk::update(name = "contest_update_add_jury_vote")]
pub fn add_jury_vote(contest_id: u64, song_id: u32, vote: Vote) -> Result<(), ContestError> {
    let jury_member = ic_cdk::api::caller();
    service::add_or_update_lobby_song_vote(contest_id, jury_member, song_id, vote)
}

#[ic_cdk::update(name = "contest_update_add_public_vote")]
pub fn add_public_vote(contest_id: u64, song_id: u32, vote: Vote) -> Result<(), ContestError> {
    let voter = ic_cdk::api::caller();
    service::add_or_update_live_song_vote(contest_id, voter, song_id, vote)
}
