use candid::CandidType;
use serde::Deserialize;
use std::hash::Hash;

#[derive(Clone, Deserialize, CandidType)]
pub enum Status {
    InProgress,
    Stopped,
}

#[derive(Clone, Deserialize, CandidType, Hash, Eq, PartialEq, Debug)]
pub struct OptionalStages {
    pub lobby: bool,
    pub jury: bool,
}
