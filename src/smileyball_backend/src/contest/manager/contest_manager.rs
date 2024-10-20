use crate::contest::constants::{
    MAX_SONG_AMOUNT, MIN_SONG_AMOUNT, OPTIONAL_STAGES_INIT, PRICE_POOL_INIT,
};
use crate::contest::model::contest::{ContestData, CreateContest};
use crate::contest::model::stage::Status;

impl ContestData {
    pub fn new_initial(params: CreateContest) -> Self {
        let added_by = ic_cdk::api::caller();
        let created_at = ic_cdk::api::time();

        let optional_stages = params.optional_stages.unwrap_or(OPTIONAL_STAGES_INIT);

        let min_songs_amount = params.min_songs_amount.unwrap_or(MIN_SONG_AMOUNT);
        let max_songs_amount = params.max_songs_amount.unwrap_or(MAX_SONG_AMOUNT);

        ContestData {
            contest_title: params.contest_title,
            contest_description: params.contest_description,
            optional_stages,
            songs_in_lobby_amount: None,
            total_votes: None,
            price_pool_init: PRICE_POOL_INIT,
            status: Some(Status::InProgress),
            jury: None,
            lobby_songs: None,
            contest_songs: None,
            contest_results: None,
            min_songs_amount: Some(min_songs_amount),
            max_songs_amount: Some(max_songs_amount),
            added_by,
            created_at,
        }
    }
}
