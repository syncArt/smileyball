use crate::contest::model::error::ContestError;
use crate::contest::model::vote::Vote;
use crate::contest::repository;
use crate::management::model::ContestStage;
use crate::utils::validate_stage;
use candid::Principal;

pub fn add_or_update_live_song_vote(
    contest_id: u64,
    voter: Principal,
    song_id: u32,
    vote: Vote,
) -> Result<(), ContestError> {
    validate_stage(contest_id, vec![ContestStage::Live])?;

    let mut contest = repository::get_contest_by_id(contest_id)?;

    if let Some(contest_songs) = &mut contest.contest_songs {
        if let Some(song) = contest_songs.get_mut(&song_id) {
            song.contest_votes.insert(voter, vote);
            repository::update_contest(contest_id, contest)?;
            return Ok(());
        }
    }

    Err(ContestError::KeyNotFound)
}

pub fn add_or_update_lobby_song_vote(
    contest_id: u64,
    jury_member: Principal,
    song_id: u32,
    vote: Vote,
) -> Result<(), ContestError> {
    validate_stage(contest_id, vec![ContestStage::Jury])?;

    let mut contest = repository::get_contest_by_id(contest_id)?;

    if let Some(lobby_songs) = &mut contest.lobby_songs {
        if let Some(song) = lobby_songs.get_mut(&song_id) {
            song.lobby_votes.insert(jury_member, vote);
            repository::update_contest(contest_id, contest)?;
            return Ok(());
        }
    }

    Err(ContestError::KeyNotFound)
}
