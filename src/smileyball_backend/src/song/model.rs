use candid::CandidType;
use serde::Deserialize;

#[derive(Clone, Deserialize, CandidType)]
pub struct Song {
    pub spotify_song_id: u32,
    pub song_title: String,
}
