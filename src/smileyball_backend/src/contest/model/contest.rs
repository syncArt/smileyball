use crate::contest::model::live::Live;
use crate::contest::model::lobby::{Duration, Lobby};
use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestData {
    pub contest_title: String,
    pub contest_description: String,
    pub optional_stages: OptionalStages,
    pub status: Option<Status>,
    pub jury_pids: Option<Vec<Principal>>,
    pub live: Option<Live>,
    pub lobby: Option<Lobby>,
    pub results: Option<Vec<ContestResultData>>,
    pub price_pool_init: u64,
    pub added_by: Principal,
    pub created_at: u64,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct CreateContest {
    pub contest_title: String,
    pub contest_description: String,
    pub optional_stages: Option<OptionalStages>,
    pub min_songs_amount: Option<u32>,
    pub max_songs_amount: Option<u32>,
    pub lobby_duration: Option<Duration>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestSongData {
    pub added_by: Principal,
    pub contest_votes: HashMap<Principal, Vote>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestResultData {
    pub position: u32,
    pub votes_amount: u32,
    pub votes_average: f32,
    pub top_voters: HashMap<Principal, Vote>,
    pub finished_at: Option<String>,
    pub closed_by: Option<Principal>,
}

#[derive(Clone, Deserialize, CandidType)]
pub enum Status {
    InProgress,
    Stopped,
}

#[derive(Clone, Deserialize, CandidType, Hash, Eq, PartialEq, Debug)]
pub struct OptionalStages {
    pub lobby: bool,
    pub jury: bool,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct Vote {
    pub vote: u8,
}
