use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;
use std::error::Error;
use std::fmt::{Display, Formatter};

#[derive(Clone, Deserialize, CandidType)]
pub struct Song {
    pub song_id: u32,
    pub song_title: String,
    pub added_by: Principal,
    pub jury_votes: HashMap<u32, u32>, // principal_id: number_of_votes
}

struct SongResultInContest {
    position: u32,
    votest_amount: u32,
    votes_average: f64,
    voters: Vec<Principal>,
}

#[derive(Clone, Deserialize, CandidType)]
pub enum Status {
    InProgres,
    STOPPED,
    CANCELED,
}

#[derive(Clone, Deserialize, CandidType)]

pub enum ContestStage {
    BEGINNING,
    MIDDLE,
    LATE,
}

#[derive(Debug, CandidType)]
pub enum ContestError {
    DuplicateContest,
    KeyNotFound,
    InvalidData,
}

impl Display for ContestError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ContestError::DuplicateContest => write!(f, "Contest with the same ID already exist"),
            ContestError::KeyNotFound => write!(f, "Couldn't find key"),
            ContestError::InvalidData => write!(f, "Provided data is invalid"),
        }
    }
}

impl Error for ContestError {}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestData {
    pub contest_id: u32, // uuid
    pub contest_title: String,
    pub contest_description: String,
    pub songs_in_lobby_amount: u32,
    pub total_votes: u32,
    pub price_pool_init: u64,
    pub status_value: Status,
    pub status_info: String,
    pub jury: Vec<String>, // vector of Principals or principal_id
    pub contest_stage: ContestStage,
    pub lobby_songs: HashMap<u32, Song>, // HashMap<song_id: Song>
    pub contest_songs: HashMap<u32, Song>,
    pub added_by: Principal,
    // Because DateTime<Utc> dont support of derive of CandidType and Deserialize we should look for a way to convert a unix timestamp with u64 type to DateTime<UTc>
    pub created_at: u64,
    pub finished_at: u64,
    pub closed_by: Option<Principal>,
}

impl ContestData {
    pub fn change_contest_status(&mut self, new_status: Status) -> () {
        self.status_value = new_status;
    }

    pub fn change_contest_stage(&mut self, new_stage: ContestStage) -> () {
        self.contest_stage = new_stage;
    }
}
