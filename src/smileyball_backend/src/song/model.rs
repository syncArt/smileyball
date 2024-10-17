use candid::CandidType;
use serde::Deserialize;
use std::error::Error;
use std::fmt::{Display, Formatter};

#[derive(Clone, Deserialize, CandidType)]
pub struct Song {
    pub spotify_song_id: u32,
    pub song_title: String,
}

#[derive(Debug, CandidType)]
pub enum SongError {
    DuplicateSong,
    SongNotFound,
}

impl Display for SongError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            SongError::DuplicateSong => write!(f, "Song with the same ID already exist"),
            SongError::SongNotFound => write!(f, "Couldn't find song"),
        }
    }
}

impl Error for SongError {}
