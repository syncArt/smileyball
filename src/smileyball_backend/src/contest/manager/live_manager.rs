use crate::contest::model::contest::{ContestResultData, ContestSongData, Vote};
use crate::contest::model::live::Live;
use crate::contest::model::lobby::Lobby;
use candid::Principal;
use std::collections::HashMap;

impl Live {
    pub fn init_from_lobby(lobby: &Lobby) -> Self {
        Live {
            total_votes_amount: None,
            contest_songs: None,
            duration: lobby.duration,
            voting_deadline: None,
        }
    }
    pub fn add_song_to_live(
        &mut self,
        song_id: u32,
        song_data: ContestSongData,
    ) -> Result<(), String> {
        if let Some(ref mut songs) = self.contest_songs {
            if songs.contains_key(&song_id) {
                return Err("Song with the given ID has already been added to live.".to_string());
            }
            songs.insert(song_id, song_data);
        } else {
            self.contest_songs = Some(HashMap::new());
            if let Some(ref mut songs) = self.contest_songs {
                songs.insert(song_id, song_data);
            }
        }
        Ok(())
    }

    pub fn add_public_vote(
        &mut self,
        voter: Principal,
        song_id: u32,
        vote: Vote,
    ) -> Result<(), String> {
        if let Some(ref mut contest_songs) = self.contest_songs {
            if let Some(song) = contest_songs.get_mut(&song_id) {
                song.contest_votes.insert(voter, vote);
                self.total_votes_amount = Some(self.total_votes_amount.unwrap_or(0) + 1);
                Ok(())
            } else {
                Err("Song with the given ID was not found.".to_string())
            }
        } else {
            Err("The list of contest songs is empty.".to_string())
        }
    }

    pub fn finalize_contest(&self) -> Result<Vec<ContestResultData>, String> {
        if let Some(ref contest_songs) = self.contest_songs {
            let mut results: Vec<ContestResultData> = vec![];

            for song_data in contest_songs.values() {
                let votes_amount = song_data.contest_votes.len() as u32;
                let votes_average = song_data
                    .contest_votes
                    .values()
                    .map(|v| v.vote as u32)
                    .sum::<u32>() as f32
                    / votes_amount as f32;

                let result = ContestResultData {
                    position: 0,
                    votes_amount,
                    votes_average,
                    top_voters: song_data.contest_votes.clone(),
                    finished_at: Some(ic_cdk::api::time().to_string()),
                    closed_by: Some(ic_cdk::api::caller()),
                };

                results.push(result);
            }

            results.sort_by(|a, b| b.votes_average.partial_cmp(&a.votes_average).unwrap());

            for (i, result) in results.iter_mut().enumerate() {
                result.position = (i + 1) as u32;
            }

            Ok(results)
        } else {
            Err("No songs available for summary.".to_string())
        }
    }
}
