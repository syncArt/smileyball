use candid::CandidType;
use serde::Deserialize;
use std::error::Error;
use std::fmt::{Display, Formatter};

#[derive(Clone, Deserialize, CandidType, Debug)]
pub enum ContestError {
    DuplicateContest,
    KeyNotFound,
    UpdateError(UpdateError),
    InvalidStageTransition,
    MissingSongs,
    ContestStopped,
    UnauthorizedAccess,
    MissingSongsInLobby,
}

#[derive(Clone, Deserialize, CandidType, Debug)]
pub struct UpdateError {
    pub message: String,
}

impl UpdateError {
    pub fn new(message: String) -> Self {
        UpdateError { message }
    }
}

impl Display for UpdateError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl Display for ContestError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ContestError::DuplicateContest => write!(f, "Contest with the same ID already exists"),
            ContestError::KeyNotFound => write!(f, "Couldn't find key"),
            ContestError::UpdateError(e) => write!(f, "Update error: {}", e),
            ContestError::MissingSongs => write!(f, "Missing Songs for prev stage"),
            ContestError::UnauthorizedAccess => write!(f, "Unauthorized access to the method"),
            ContestError::InvalidStageTransition => write!(f, "Invalid stage transition"),
            ContestError::ContestStopped => write!(f, "The contest is currently stopped"),
            ContestError::MissingSongsInLobby => {
                write!(f, "Lobby songs cannot be empty if lobby stage is skipped")
            }
        }
    }
}

impl Error for ContestError {}
