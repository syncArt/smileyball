use crate::contest::model::contest::{ContestData, CreateContest};
use crate::contest::model::stage::{OptionalStages, Status};

impl ContestData {
    pub fn new_initial(params: CreateContest) -> Self {
        let added_by = ic_cdk::api::caller();
        let created_at = ic_cdk::api::time();

        let optional_stages = OptionalStages {
            lobby: params.optional_stages.lobby,
            jury: params.optional_stages.jury,
        };

        ContestData {
            contest_title: params.contest_title,
            contest_description: params.contest_description,
            optional_stages,
            songs_in_lobby_amount: None,
            total_votes: None,
            price_pool_init: 0,
            status: Some(Status::InProgress),
            jury: None,
            lobby_songs: None,
            contest_songs: None,
            contest_results: None,
            added_by,
            created_at,
        }
    }
}
