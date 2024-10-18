use candid::CandidType;
use candid::Principal;
use serde::Deserialize;
use std::collections::HashMap;
use std::error::Error;
use std::fmt;
use std::fmt::{Display, Formatter};

impl Display for ContestError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ContestError::DuplicateContest => write!(f, "Contest with the same ID already exists"),
            ContestError::KeyNotFound => write!(f, "Couldn't find key"),
            ContestError::UpdateError(e) => write!(f, "Update error: {}", e),
        }
    }
}

impl Error for ContestError {}

#[derive(Clone, Deserialize, CandidType, Debug)]
pub enum ContestError {
    DuplicateContest,
    KeyNotFound,
    UpdateError(UpdateError),
}

#[derive(Clone, Deserialize, CandidType, Debug)]
pub struct UpdateError {
    pub message: String,
}

impl UpdateError {
    pub fn new(message: String) -> Self {
        UpdateError { message }
    }
}

impl fmt::Display for UpdateError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestSongData {
    pub added_by: Principal,
    pub jury_votes: HashMap<Principal, Vote>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct Vote {
    pub vote: u8,
}

#[derive(Clone, Deserialize, CandidType)]
pub enum Status {
    InProgress,
    Stopped,
    Canceled,
}

#[derive(Clone, Deserialize, CandidType, Hash, Eq, PartialEq)]
pub enum OptionalStageType {
    Lobby,
    Jury,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct LobbySongData {
    pub added_by: Principal,
    pub jury_votes: HashMap<Principal, Vote>,
}

impl LobbySongData {
    pub fn new(added_by: Principal) -> Self {
        LobbySongData {
            added_by,
            jury_votes: HashMap::new(),
        }
    }
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestResultData {
    pub position: u32,
    pub votes_amount: u32,
    pub votes_average: f32,
    pub top_voters: Vec<Vote>,
    pub finished_at: Option<String>,
    pub closed_by: Option<Principal>,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestData {
    pub contest_title: String,
    pub contest_description: String,
    pub optional_stages: HashMap<OptionalStageType, bool>,
    pub songs_in_lobby_amount: Option<u32>,
    pub total_votes: Option<u32>,
    pub price_pool_init: u64,
    pub status: Option<Status>,
    pub jury: Option<Vec<Principal>>,
    pub lobby_songs: Option<HashMap<u32, LobbySongData>>,
    pub contest_songs: Option<HashMap<u32, ContestSongData>>,
    pub contest_results: Option<Vec<ContestResultData>>,
    pub added_by: Principal,
    pub created_at: u64,
}

#[derive(Clone, Deserialize, CandidType)]
pub struct CreateContest {
    pub contest_title: String,
    pub contest_description: String,
}

impl ContestData {
    pub fn new_initial(contest_title: String, contest_description: String) -> Self {
        let added_by = ic_cdk::api::caller();
        let created_at = ic_cdk::api::time();
        let mut optional_stages = HashMap::new();
        optional_stages.insert(OptionalStageType::Lobby, true);
        optional_stages.insert(OptionalStageType::Jury, false);

        ContestData {
            contest_title,
            contest_description,
            songs_in_lobby_amount: None,
            optional_stages,
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

    pub fn add_jury_vote(
        &mut self,
        jury_member: Principal,
        song_id: u32,
        vote: Vote,
    ) -> Result<(), String> {
        if let Some(ref mut lobby_songs) = self.lobby_songs {
            if let Some(song) = lobby_songs.get_mut(&song_id) {
                song.jury_votes.insert(jury_member, vote);
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
    pub fn add_public_vote(
        &mut self,
        voter: Principal,
        song_id: u32,
        vote: Vote,
    ) -> Result<(), String> {
        if let Some(ref mut contest_songs) = self.contest_songs {
            if let Some(song) = contest_songs.get_mut(&song_id) {
                song.jury_votes.insert(voter, vote);
                Ok(())
            } else {
                Err("Song with the given ID was not found.".to_string())
            }
        } else {
            Err("The list of contest songs is empty.".to_string())
        }
    }
    pub fn finalize_contest(&mut self) -> Result<(), String> {
        if let Some(ref contest_songs) = self.contest_songs {
            let mut results: Vec<ContestResultData> = vec![];

            for song_data in contest_songs.values() {
                let votes_amount = song_data.jury_votes.len() as u32;
                let votes_average = song_data
                    .jury_votes
                    .values()
                    .map(|v| v.vote as u32)
                    .sum::<u32>() as f32
                    / votes_amount as f32;

                let result = ContestResultData {
                    position: 0,
                    votes_amount,
                    votes_average,
                    top_voters: song_data.jury_votes.values().cloned().collect(),
                    finished_at: Some(ic_cdk::api::time().to_string()),
                    closed_by: Some(ic_cdk::api::caller()),
                };

                results.push(result);
            }

            results.sort_by(|a, b| b.votes_average.partial_cmp(&a.votes_average).unwrap());

            for (i, result) in results.iter_mut().enumerate() {
                result.position = (i + 1) as u32;
            }

            self.contest_results = Some(results);

            Ok(())
        } else {
            Err("No songs available for summary.".to_string())
        }
    }
}

#[derive(Clone, Deserialize, CandidType)]
pub struct ContestDataToUpdate {
    pub contest_title: Option<String>,
    pub contest_description: Option<String>,
    pub songs_in_lobby_amount: Option<u32>,
    pub total_votes: Option<u32>,
    pub status: Option<Status>,
    pub jury: Option<Vec<Principal>>,
    pub lobby_songs: Option<HashMap<u32, LobbySongData>>,
    pub contest_songs: Option<HashMap<u32, ContestSongData>>,
    pub contest_results: Option<Vec<ContestResultData>>,
}
