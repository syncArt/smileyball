use crate::contest::model::contest::ContestData;
use crate::contest::model::error::{ContestError, UpdateError};
use crate::contest::repository::update_contest;
use crate::management::model::ContestStage;
use crate::management::repository::{remove_contest_from_stage, update_contest_stage};

pub fn process_lobby_stage(contest: &mut ContestData, contest_id: u64) -> Result<(), ContestError> {
    let songs_count = contest
        .lobby
        .as_ref()
        .and_then(|l| l.songs_data.as_ref())
        .map_or(0, |songs| songs.len() as u32);

    if let Some(min) = contest.lobby.as_ref().and_then(|l| l.min_songs_amount) {
        if songs_count < min {
            return Err(ContestError::NotEnoughSongsInLobby);
        }
    }
    if let Some(max) = contest.lobby.as_ref().and_then(|l| l.max_songs_amount) {
        if songs_count > max {
            return Err(ContestError::TooManySongsInLobby);
        }
    }

    remove_contest_from_stage(ContestStage::Lobby, contest_id);

    if contest.optional_stages.jury {
        update_contest_stage(ContestStage::Jury, contest_id);
    } else {
        contest
            .start_live_stage()
            .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;

        update_contest_stage(ContestStage::Live, contest_id);
        update_contest(contest_id, contest.clone())?;
    }

    Ok(())
}
