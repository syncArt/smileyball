use crate::contest::constants::{
    DEFAULT_LOBBY_DURATION, MAX_SONG_AMOUNT, MIN_SONG_AMOUNT, OPTIONAL_STAGES_INIT, PRICE_POOL_INIT,
};
use crate::contest::model::contest::{ContestData, CreateContest, Status, Vote};
use crate::contest::model::live::Live;
use crate::contest::model::lobby::Lobby;
use candid::Principal;

impl ContestData {
    pub fn new_initial(params: CreateContest) -> Self {
        let added_by = ic_cdk::api::caller();
        let created_at = ic_cdk::api::time();

        let optional_stages = params.optional_stages.unwrap_or(OPTIONAL_STAGES_INIT);
        let min_songs_amount = params.min_songs_amount.unwrap_or(MIN_SONG_AMOUNT);
        let max_songs_amount = params.max_songs_amount.unwrap_or(MAX_SONG_AMOUNT);
        let lobby_duration = params.lobby_duration.unwrap_or(DEFAULT_LOBBY_DURATION);

        ContestData {
            contest_title: params.contest_title,
            contest_description: params.contest_description,
            optional_stages,
            status: Some(Status::InProgress),
            jury_pids: None,
            live: None,
            lobby: Some(Lobby {
                duration: lobby_duration,
                submission_deadline: None,
                songs_data: None,
                min_songs_amount: Some(min_songs_amount),
                max_songs_amount: Some(max_songs_amount),
                total_songs_amount: None,
                total_jury_votes_amount: None,
            }),
            results: None,
            price_pool_init: PRICE_POOL_INIT,
            added_by,
            created_at,
        }
    }

    pub fn add_jury_member(&mut self, jury_member: Principal) -> Result<(), String> {
        if let Some(ref mut jury_pids) = self.jury_pids {
            if !jury_pids.contains(&jury_member) {
                jury_pids.push(jury_member);
            }
            Ok(())
        } else {
            self.jury_pids = Some(vec![jury_member]);
            Ok(())
        }
    }

    pub fn add_jury_vote(
        &mut self,
        jury_member: Principal,
        song_id: u32,
        vote: Vote,
    ) -> Result<(), String> {
        if let Some(ref mut lobby) = self.lobby {
            lobby.add_jury_vote(jury_member, song_id, vote)
        } else {
            Err("Lobby is not initialized for this contest.".to_string())
        }
    }

    pub fn add_public_vote(
        &mut self,
        voter: Principal,
        song_id: u32,
        vote: Vote,
    ) -> Result<(), String> {
        if let Some(ref mut live) = self.live {
            live.add_public_vote(voter, song_id, vote)
        } else {
            Err("Live stage is not initialized for this contest.".to_string())
        }
    }

    pub fn start_live_stage(&mut self) -> Result<(), String> {
        if let Some(ref lobby) = self.lobby {
            if self.live.is_none() {
                self.live = Some(Live {
                    total_votes_amount: None,
                    contest_songs: None,
                    duration: lobby.duration,
                    voting_deadline: None,
                });
            }

            if let Some(ref mut live) = self.live {
                live.contest_songs = Some(lobby.move_songs_to_live()?);
                Ok(())
            } else {
                Err("Failed to initialize live stage.".to_string())
            }
        } else {
            Err("Lobby is not initialized for this contest.".to_string())
        }
    }

    pub fn finalize_contest(&mut self) -> Result<(), String> {
        if let Some(ref live) = self.live {
            let results = live.finalize_contest()?;
            self.results = Some(results);
            Ok(())
        } else {
            Err("Live stage is not initialized for this contest.".to_string())
        }
    }
}
