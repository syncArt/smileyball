use crate::contest::model::contest::ContestSongData;
use crate::contest::model::lobby::Duration;
use candid::{CandidType, Deserialize};
use std::collections::HashMap;

#[derive(Clone, Deserialize, CandidType)]
pub struct Live {
    pub total_votes_amount: Option<u32>,
    pub contest_songs: Option<HashMap<u32, ContestSongData>>,
    pub duration: Duration,
    pub voting_deadline: Option<u64>,
}
