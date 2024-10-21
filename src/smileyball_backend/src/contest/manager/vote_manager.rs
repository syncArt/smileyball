use crate::contest::model::contest::ContestData;
use crate::contest::model::vote::Vote;
use candid::Principal;

impl ContestData {
    pub fn add_jury_vote(
        &mut self,
        jury_member: Principal,
        song_id: u32,
        vote: Vote,
    ) -> Result<(), String> {
        if let Some(ref mut lobby_songs) = self.lobby_songs {
            if let Some(song) = lobby_songs.get_mut(&song_id) {
                song.lobby_votes.insert(jury_member, vote);
                Ok(())
            } else {
                Err("Song with the given ID was not found.".to_string())
            }
        } else {
            Err("The list of contest songs is empty.".to_string())
        }
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
                Ok(())
            } else {
                Err("Song with the given ID was not found.".to_string())
            }
        } else {
            Err("The list of contest songs is empty.".to_string())
        }
    }

    pub fn add_jury_member(&mut self, jury_member: Principal) -> Result<(), String> {
        if let Some(ref mut jury) = self.jury {
            if !jury.contains(&jury_member) {
                jury.push(jury_member);
            }
            Ok(())
        } else {
            self.jury = Some(vec![jury_member]);
            Ok(())
        }
    }
}
