use crate::management::model::{ContestStage, ManagementData, Operation, UserRole};
use crate::with_management;
use candid::Principal;

pub fn get_management_data() -> ManagementData {
    with_management(|management| management.borrow().clone())
}

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

pub fn add_operation(operation: Operation) {
    with_management(|management| {
        let mut management = management.borrow_mut();
        management.operations.push(operation);
    });
}

pub fn assign_role(role: UserRole, principal: Principal) {
    with_management(|management| {
        let mut management = management.borrow_mut();
        match role {
            UserRole::SuperAdmin => management.roles.super_admin.push(principal),
            UserRole::Admin => management.roles.admin.push(principal),
            UserRole::Jury => management.roles.jury.push(principal),
        }
    });
}

pub fn remove_role(role: UserRole, principal: Principal) {
    with_management(|management| {
        let mut management = management.borrow_mut();
        match role {
            UserRole::SuperAdmin => management.roles.super_admin.retain(|p| p != &principal),
            UserRole::Admin => management.roles.admin.retain(|p| p != &principal),
            UserRole::Jury => management.roles.jury.retain(|p| p != &principal),
        }
    });
}
