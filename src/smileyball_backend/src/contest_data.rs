use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;
use std::error::Error;
use std::fmt::{Display, Formatter};

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
}

#[derive(Debug, CandidType)]
pub enum ContestError {
    DuplicateContest,
    KeyNotFound,
}

impl Display for ContestError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ContestError::DuplicateContest => write!(f, "Contest with the same ID already exist"),
            ContestError::KeyNotFound => write!(f, "Couldn't find key"),
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
