use crate::contest::model::stage::{OptionalStages, Status};
use crate::contest::model::vote::{ContestResultData, ContestSongData, LobbySongData};
use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestData {
    pub contest_title: String,
    pub contest_description: String,
    pub optional_stages: OptionalStages,
    pub songs_in_lobby_amount: Option<u32>,
    pub total_votes: Option<u32>,
    pub price_pool_init: u64,
    pub status: Option<Status>,
    pub jury: Option<Vec<Principal>>,
    pub lobby_songs: Option<HashMap<u32, LobbySongData>>,
    pub contest_songs: Option<HashMap<u32, ContestSongData>>,
    pub contest_results: Option<Vec<ContestResultData>>,
    pub added_by: Principal,
    pub created_at: u64,
}

#[derive(Clone, Debug, Deserialize, CandidType)]
pub struct CreateContest {
    pub contest_title: String,
    pub contest_description: String,
    pub optional_stages: OptionalStages,
}
