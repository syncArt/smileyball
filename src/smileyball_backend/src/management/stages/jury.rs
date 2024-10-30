use crate::contest::model::contest::ContestData;
use crate::contest::model::error::{ContestError, UpdateError};
use crate::contest::repository::update_contest;
use crate::management::model::ContestStage;
use crate::management::repository::{remove_contest_from_stage, update_contest_stage};

pub fn process_jury_stage(contest: &mut ContestData, contest_id: u64) -> Result<(), ContestError> {
    contest
        .start_live_stage()
        .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?;

    remove_contest_from_stage(ContestStage::Jury, contest_id);
    update_contest_stage(ContestStage::Live, contest_id);
    update_contest(contest_id, contest.clone())?;

    Ok(())
}
