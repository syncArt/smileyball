use crate::management::model::{ContestStage, ManagementData};
use crate::with_management;

pub fn update_contest_stage(stage: ContestStage, contest_id: u64) {
    with_management(|management| {
        let mut management = management.borrow_mut();
        match stage {
            ContestStage::Waiting => management.contest_stages.waiting.push(contest_id),
            ContestStage::Lobby => management.contest_stages.lobby.push(contest_id),
            ContestStage::Jury => management.contest_stages.jury.push(contest_id),
            ContestStage::Live => management.contest_stages.live.push(contest_id),
            ContestStage::Finished => management.contest_stages.finished.push(contest_id),
            ContestStage::Paid => management.contest_stages.paid.push(contest_id),
            ContestStage::Canceled => management.contest_stages.canceled.push(contest_id),
            ContestStage::Archived => management.contest_stages.archived.push(contest_id),
        }
    });
}

pub fn is_contest_in_stage(stage: ContestStage, contest_id: u64) -> bool {
    with_management(|management| {
        let management = management.borrow();
        match stage {
            ContestStage::Waiting => management.contest_stages.waiting.contains(&contest_id),
            ContestStage::Lobby => management.contest_stages.lobby.contains(&contest_id),
            ContestStage::Jury => management.contest_stages.jury.contains(&contest_id),
            ContestStage::Live => management.contest_stages.live.contains(&contest_id),
            ContestStage::Finished => management.contest_stages.finished.contains(&contest_id),
            ContestStage::Paid => management.contest_stages.paid.contains(&contest_id),
            ContestStage::Canceled => management.contest_stages.canceled.contains(&contest_id),
            ContestStage::Archived => management.contest_stages.archived.contains(&contest_id),
        }
    })
}

pub fn remove_contest_from_stage(stage: ContestStage, contest_id: u64) {
    with_management(|management| {
        let mut management = management.borrow_mut();
        match stage {
            ContestStage::Waiting => management
                .contest_stages
                .waiting
                .retain(|&id| id != contest_id),
            ContestStage::Lobby => management
                .contest_stages
                .lobby
                .retain(|&id| id != contest_id),
            ContestStage::Jury => management
                .contest_stages
                .jury
                .retain(|&id| id != contest_id),
            ContestStage::Live => management
                .contest_stages
                .live
                .retain(|&id| id != contest_id),
            ContestStage::Finished => management
                .contest_stages
                .finished
                .retain(|&id| id != contest_id),
            ContestStage::Paid => management
                .contest_stages
                .paid
                .retain(|&id| id != contest_id),
            ContestStage::Canceled => management
                .contest_stages
                .canceled
                .retain(|&id| id != contest_id),
            ContestStage::Archived => management
                .contest_stages
                .archived
                .retain(|&id| id != contest_id),
        }
    });
}
pub fn get_management_data() -> Option<ManagementData> {
    with_management(|management| Some(management.borrow().clone()))
}
