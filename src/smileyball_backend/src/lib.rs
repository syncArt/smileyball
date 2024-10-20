use crate::contest::model::contest::CreateContest;
use crate::contest::model::error::ContestError;
use crate::contest::model::stage::Status;
use crate::contest::model::vote::Vote;
use crate::management::model::ContestStage;
use crate::management::model::GetContestStagesResponse;

use std::{cell::RefCell, collections::HashMap};

mod contest;
mod management;
mod song;
mod utils;

use crate::contest::model::contest::ContestData;
use management::model::ManagementData;
use song::model::Song;

thread_local! {
    static SONGS: RefCell<HashMap<u32, Song>> = RefCell::default();
    static CONTESTS: RefCell<HashMap<u64, ContestData>> = RefCell::default();
    static MANAGEMENT: RefCell<ManagementData> = RefCell::default();
}

pub fn with_contests<F, R>(f: F) -> R
where
    F: FnOnce(&RefCell<HashMap<u64, ContestData>>) -> R,
{
    CONTESTS.with(|contests| f(contests))
}

pub fn with_management<F, R>(f: F) -> R
where
    F: FnOnce(&RefCell<ManagementData>) -> R,
{
    MANAGEMENT.with(|management| f(management))
}

ic_cdk::export_candid!();
