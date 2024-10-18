use crate::contest::model::error::{ContestError, UpdateError};
use crate::contest::model::stage::Status;
use crate::contest::repository::update_contest;
use crate::contest::service::get_contest_by_id;
use crate::management::model::ContestStage;
use crate::management::repository::{
    is_contest_in_stage, remove_contest_from_stage, update_contest_stage,
};

pub fn process_next(contest_id: u64) -> Result<(), ContestError> {
    let mut contest = get_contest_by_id(contest_id)?;
    if let Some(Status::Stopped) = contest.status {
        return Err(ContestError::ContestStopped);
    }

    // Używamy funkcji z repository do sprawdzania etapu konkursu
    let current_stage = if is_contest_in_stage(ContestStage::Waiting, contest_id) {
        ContestStage::Waiting
    } else if is_contest_in_stage(ContestStage::Lobby, contest_id) {
        ContestStage::Lobby
    } else if is_contest_in_stage(ContestStage::Jury, contest_id) {
        ContestStage::Jury
    } else if is_contest_in_stage(ContestStage::Live, contest_id) {
        ContestStage::Live
    } else if is_contest_in_stage(ContestStage::Finished, contest_id) {
        ContestStage::Finished
    } else {
        return Err(ContestError::InvalidStageTransition);
    };

    match current_stage {
        ContestStage::Waiting => {
            remove_contest_from_stage(ContestStage::Waiting, contest_id);

            if !contest.optional_stages.lobby
                && (contest.lobby_songs.is_none()
                    || contest.lobby_songs.as_ref().unwrap().is_empty())
            {
                return Err(ContestError::MissingSongsInLobby);
            }

            if contest.optional_stages.lobby {
                update_contest_stage(ContestStage::Lobby, contest_id);
            } else if contest.optional_stages.jury {
                update_contest_stage(ContestStage::Jury, contest_id);
            } else {
                contest
                    .move_songs_to_contest()
                    .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
                update_contest_stage(ContestStage::Live, contest_id);
                update_contest(contest_id, contest)?;
            }
        }
        ContestStage::Lobby => {
            remove_contest_from_stage(ContestStage::Lobby, contest_id);

            if contest.optional_stages.jury {
                update_contest_stage(ContestStage::Jury, contest_id);
            } else {
                contest
                    .move_songs_to_contest()
                    .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
                update_contest_stage(ContestStage::Live, contest_id);
                update_contest(contest_id, contest)?;
            }
        }
        ContestStage::Jury => {
            remove_contest_from_stage(ContestStage::Jury, contest_id);

            contest
                .move_songs_to_contest()
                .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
            update_contest_stage(ContestStage::Live, contest_id);
            update_contest(contest_id, contest)?;
        }
        ContestStage::Live => {
            remove_contest_from_stage(ContestStage::Live, contest_id);
            update_contest_stage(ContestStage::Finished, contest_id);
            update_contest(contest_id, contest)?;
        }
        ContestStage::Finished => {
            contest
                .finalize_contest()
                .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;
            remove_contest_from_stage(ContestStage::Finished, contest_id);
            update_contest_stage(ContestStage::Paid, contest_id);
            update_contest(contest_id, contest)?;
        }
        _ => return Err(ContestError::InvalidStageTransition),
    }

    Ok(())
}

pub fn get_current_stage(contest_id: u64) -> Result<ContestStage, ContestError> {
    if is_contest_in_stage(ContestStage::Waiting, contest_id) {
        Ok(ContestStage::Waiting)
    } else if is_contest_in_stage(ContestStage::Lobby, contest_id) {
        Ok(ContestStage::Lobby)
    } else if is_contest_in_stage(ContestStage::Jury, contest_id) {
        Ok(ContestStage::Jury)
    } else if is_contest_in_stage(ContestStage::Live, contest_id) {
        Ok(ContestStage::Live)
    } else if is_contest_in_stage(ContestStage::Finished, contest_id) {
        Ok(ContestStage::Finished)
    } else if is_contest_in_stage(ContestStage::Paid, contest_id) {
        Ok(ContestStage::Paid)
    } else if is_contest_in_stage(ContestStage::Canceled, contest_id) {
        Ok(ContestStage::Canceled)
    } else if is_contest_in_stage(ContestStage::Archived, contest_id) {
        Ok(ContestStage::Archived)
    } else {
        Err(ContestError::KeyNotFound)
    }
}
