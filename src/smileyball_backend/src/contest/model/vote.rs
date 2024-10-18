use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;

#[derive(Clone, Deserialize, CandidType)]
pub struct Vote {
    pub vote: u8,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct LobbySongData {
    pub added_by: Principal,
    pub lobby_votes: HashMap<Principal, Vote>,
}

impl LobbySongData {
    pub fn new(added_by: Principal) -> Self {
        LobbySongData {
            added_by,
            lobby_votes: HashMap::new(),
        }
    }
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
    pub top_voters: Vec<Vote>,
    pub finished_at: Option<String>,
    pub closed_by: Option<Principal>,
}
