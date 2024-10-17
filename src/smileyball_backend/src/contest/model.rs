use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;
use std::error::Error;
use std::fmt::{Display, Formatter};

impl Display for ContestError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ContestError::DuplicateContest => write!(f, "Contest with the same ID already exist"),
            ContestError::KeyNotFound => write!(f, "Couldn't find key"),
        }
    }
}

impl Error for ContestError {}

#[derive(Debug, CandidType)]
pub enum ContestError {
    DuplicateContest,
    KeyNotFound,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestSongData {
    pub added_by: Principal,
    pub jury_votes: HashMap<Principal, Vote>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct Vote {
    pub vote: u8,
}

#[derive(Clone, Deserialize, CandidType)]
pub enum Status {
    InProgress,
    Stopped,
    Canceled,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct LobbySongData {
    pub added_by: Principal,
    pub jury_votes: Vec<Vote>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestResultData {
    pub position: u32,
    pub votes_amount: u32,
    pub votes_average: f32,
    pub top_voters: Vec<Vote>,
    pub finished_at: Option<String>,
    pub closed_by: Option<Principal>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestData {
    pub contest_title: String,
    pub contest_description: String,
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

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestDataToUpdate {
    pub contest_title: Option<String>,
    pub contest_description: Option<String>,
    pub songs_in_lobby_amount: Option<u32>,
    pub total_votes: Option<u32>,
    pub status: Option<Status>,
    pub jury: Option<Vec<Principal>>,
    pub lobby_songs: Option<HashMap<u32, LobbySongData>>,
    pub contest_songs: Option<HashMap<u32, ContestSongData>>,
    pub contest_results: Option<Vec<ContestResultData>>,
}
