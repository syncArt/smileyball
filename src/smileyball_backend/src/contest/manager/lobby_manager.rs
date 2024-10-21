use crate::contest::model::contest::ContestData;
use crate::contest::model::vote::{ContestSongData, LobbySongData};
use std::collections::HashMap;

impl ContestData {
    pub fn add_song_to_lobby(
        &mut self,
        song_id: u32,
        song_data: LobbySongData,
    ) -> Result<(), String> {
        if let Some(ref mut lobby_songs) = self.lobby_songs {
            if lobby_songs.contains_key(&song_id) {
                return Err("Song with the given ID has already been added.".to_string());
            }
            lobby_songs.insert(song_id, song_data);
        } else {
            self.lobby_songs = Some(HashMap::new());
            if let Some(ref mut lobby_songs) = self.lobby_songs {
                lobby_songs.insert(song_id, song_data);
            }
        }
        Ok(())
    }

    pub fn move_songs_to_contest(&mut self) -> Result<(), String> {
        if let Some(lobby_songs) = &self.lobby_songs {
            if lobby_songs.is_empty() {
                return Err("No songs in the lobby to move to contest".to_string());
            }

            let mut contest_songs = self.contest_songs.take().unwrap_or_default();
            for (song_id, song_data) in lobby_songs {
                contest_songs.insert(
                    *song_id,
                    ContestSongData {
                        added_by: song_data.added_by,
                        contest_votes: HashMap::new(),
                    },
                );
            }

            self.contest_songs = Some(contest_songs);
            Ok(())
        } else {
            Err("Lobby songs are not available for this contest".to_string())
        }
    }
}
