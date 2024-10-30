use crate::contest::model::contest::ContestData;
use crate::contest::model::error::ContestError;
use crate::contest::repository::update_contest;
use crate::management::model::ContestStage;
use crate::management::repository::{remove_contest_from_stage, update_contest_stage};
use crate::management::stages::common::{set_submission_deadline, transfer_lobby_songs_to_contest};

pub fn process_waiting_stage(
    contest: &mut ContestData,
    contest_id: u64,
) -> Result<(), ContestError> {
    if !contest.optional_stages.lobby {
        validate_lobby_songs(contest)?;
    }

    determine_stage_from_options(contest, contest_id)?;

    remove_contest_from_stage(ContestStage::Waiting, contest_id);

    Ok(())
}

fn validate_lobby_songs(contest: &ContestData) -> Result<(), ContestError> {
    let lobby = match contest.lobby.as_ref() {
        Some(lobby) => lobby,
        None => return Err(ContestError::MissingSongsInLobby),
    };

    match lobby.songs_data.as_ref() {
        Some(songs) if !songs.is_empty() => Ok(()),
        _ => Err(ContestError::MissingSongsInLobby),
    }
}

fn determine_stage_from_options(
    contest: &mut ContestData,
    contest_id: u64,
) -> Result<(), ContestError> {
    if contest.optional_stages.lobby {
        update_contest_stage(ContestStage::Lobby, contest_id);
    } else if contest.optional_stages.jury {
        update_contest_stage(ContestStage::Jury, contest_id);
    } else {
        if let Some(ref mut lobby) = contest.lobby {
            set_submission_deadline(lobby);
        }
        transfer_lobby_songs_to_contest(contest)?;

        update_contest_stage(ContestStage::Live, contest_id);
        update_contest(contest_id, contest.clone())?;
    }

    Ok(())
}
