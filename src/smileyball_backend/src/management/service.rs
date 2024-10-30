use crate::contest::model::contest::Status;
use crate::contest::model::error::ContestError;
use crate::contest::service::get_contest_by_id;
use crate::management::model::{ContestStage, ContestStages};
use crate::management::repository;
use crate::management::repository::is_contest_in_stage;
use crate::management::stages::{finished, jury, live, lobby, waiting};

pub fn process_next(contest_id: u64) -> Result<(), ContestError> {
    let mut contest = get_contest_by_id(contest_id)?;
    if let Some(Status::Stopped) = contest.status {
        return Err(ContestError::ContestStopped);
    }

    let current_stage = get_current_stage(contest_id)?;

    match current_stage {
        ContestStage::Waiting => waiting::process_waiting_stage(&mut contest, contest_id),
        ContestStage::Lobby => lobby::process_lobby_stage(&mut contest, contest_id),
        ContestStage::Jury => jury::process_jury_stage(&mut contest, contest_id),
        ContestStage::Live => live::process_live_stage(&mut contest, contest_id),
        ContestStage::Finished => finished::process_finished_stage(&mut contest, contest_id),
        _ => Err(ContestError::InvalidStageTransition),
    }
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

pub fn get_all_contest_stages() -> Result<ContestStages, String> {
    if let Some(management_data) = repository::get_management_data() {
        Ok(management_data.contest_stages)
    } else {
        Err("Management data is not initialized.".to_string())
    }
}
