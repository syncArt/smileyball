use crate::contest::model::contest::Vote;
use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Clone, Debug, Deserialize, Copy, Serialize, CandidType)]
pub enum Duration {
    ThreeDays,
    OneWeek,
    TwoWeeks,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct Lobby {
    pub duration: Duration,
    pub submission_deadline: Option<u64>,
    pub songs_data: Option<HashMap<u32, LobbySongData>>,
    pub min_songs_amount: Option<u32>,
    pub max_songs_amount: Option<u32>,
    pub total_songs_amount: Option<u32>,
    pub total_jury_votes_amount: Option<u32>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct LobbySongData {
    pub added_by: Principal,
    pub lobby_votes: HashMap<Principal, Vote>,
}
