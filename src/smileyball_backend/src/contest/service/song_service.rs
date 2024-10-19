use crate::contest::model::error::{ContestError, UpdateError};
use crate::contest::model::vote::LobbySongData;
use crate::contest::repository;
use crate::management::model::ContestStage;
use crate::utils::validate_stage;
use candid::Principal;

pub fn add_single_song_to_lobby(
    contest_id: u64,
    song_id: u32,
    song_data: LobbySongData,
) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;

    validate_stage(contest_id, vec![ContestStage::Lobby])?;

    contest
        .add_song_to_lobby(song_id, song_data)
        .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;

    repository::update_contest(contest_id, contest)
}

pub fn add_multiple_songs_to_lobby(
    contest_id: u64,
    song_ids: Vec<u32>,
    added_by: Principal,
) -> Result<(), ContestError> {
    let mut contest = repository::get_contest_by_id(contest_id)?;

    if !contest.optional_stages.lobby {
        validate_stage(contest_id, vec![ContestStage::Waiting])?;
    } else {
        return Err(ContestError::InvalidStageTransition);
    }

    for song_id in song_ids {
        let song_data = LobbySongData::new(added_by);
        contest
            .add_song_to_lobby(song_id, song_data)
            .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
    }

    repository::update_contest(contest_id, contest)
}
