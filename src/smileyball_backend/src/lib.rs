use std::{cell::RefCell, collections::HashMap};

mod contest;
mod song;
mod utils;

use contest::model::ContestData;
use song::model::Song;

thread_local! {
    static SONGS: RefCell<HashMap<u32, Song>> = RefCell::default();
    static CONTESTS: RefCell<HashMap<u64, ContestData>> = RefCell::default();
}

pub fn with_contests<F, R>(f: F) -> R
where
    F: FnOnce(&RefCell<HashMap<u64, ContestData>>) -> R,
{
    CONTESTS.with(|contests| f(contests))
}
