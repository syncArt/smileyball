use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;
use std::error::Error;
use std::fmt::{Display, Formatter};

struct SongResultInContest {
    position: u32,
    votest_amount: u32,
    votes_average: f64,
    voters: Vec<Principal>,
}

#[derive(Clone, Deserialize, CandidType)]
struct ContestSongData {
    added_by: Principal,
    jury_votes: HashMap<Principal, Vote>
}

#[derive(Clone, Deserialize, CandidType)]
struct Vote {
    vote: u8
}

#[derive(Clone, Deserialize, CandidType)]
pub enum Status {
    InProgres,
    STOPPED,
}

#[derive(Debug, CandidType)]
pub enum ContestError {
    DuplicateContest,
    KeyNotFound,
    InvalidData,
    InvalidUuid,
}

impl Display for ContestError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ContestError::DuplicateContest => write!(f, "Contest with the same ID already exist"),
            ContestError::KeyNotFound => write!(f, "Couldn't find key"),
            ContestError::InvalidData => write!(f, "Provided data is invalid"),
            ContestError::InvalidUuid => write!(f, "Invalid id type"),
        }
    }
}

impl Error for ContestError {}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestData {
    pub contest_title: String,
    pub contest_songs: HashMap<u32, ContestSongData>,
}

#[derive(Clone, Deserialize, CandidType)]
struct ContestDataToUpdate {}