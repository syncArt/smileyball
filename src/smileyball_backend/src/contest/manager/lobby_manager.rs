use crate::contest::model::contest::{ContestSongData, Vote};
use crate::contest::model::lobby::{Lobby, LobbySongData};
use candid::Principal;
use std::collections::HashMap;

impl LobbySongData {
    pub fn new(added_by: Principal) -> Self {
        LobbySongData {
            added_by,
            lobby_votes: HashMap::new(),
        }
    }
}

impl Lobby {
    pub fn add_song_to_lobby(
        &mut self,
        song_id: u32,
        song_data: LobbySongData,
    ) -> Result<(), String> {
        if let Some(ref mut songs) = self.songs_data {
            if songs.contains_key(&song_id) {
                return Err("Song with the given ID has already been added.".to_string());
            }
            songs.insert(song_id, song_data);
            self.total_songs_amount = Some(self.total_songs_amount.unwrap_or(0) + 1);
        } else {
            self.songs_data = Some(HashMap::new());
            if let Some(ref mut songs) = self.songs_data {
                songs.insert(song_id, song_data);
                self.total_songs_amount = Some(1);
            }
        }
        Ok(())
    }

    pub fn add_jury_vote(
        &mut self,
        jury_member: Principal,
        song_id: u32,
        vote: Vote,
    ) -> Result<(), String> {
        if let Some(ref mut songs) = self.songs_data {
            if let Some(song) = songs.get_mut(&song_id) {
                song.lobby_votes.insert(jury_member, vote);
                self.total_jury_votes_amount = Some(self.total_jury_votes_amount.unwrap_or(0) + 1);
                Ok(())
            } else {
                Err("Song with the given ID was not found.".to_string())
            }
        } else {
            Err("The list of lobby songs is empty.".to_string())
        }
    }

    pub fn move_songs_to_live(&self) -> Result<HashMap<u32, ContestSongData>, String> {
        if let Some(ref songs_data) = self.songs_data {
            let mut contest_songs = HashMap::new();
            for (song_id, song_data) in songs_data {
                contest_songs.insert(
                    *song_id,
                    ContestSongData {
                        added_by: song_data.added_by,
                        contest_votes: HashMap::new(),
                    },
                );
            }
            Ok(contest_songs)
        } else {
            Err("No songs available in the lobby to move to live stage.".to_string())
        }
    }
}
