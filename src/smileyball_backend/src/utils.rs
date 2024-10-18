use crate::contest::model::error::ContestError;
use crate::management::model::ContestStage;
use crate::with_management;
use ic_cdk::api::call::call;
use ic_cdk::api::call::RejectionCode;
use std::convert::TryInto;

pub async fn generate_random_id() -> Result<u64, String> {
    let result: Result<(Vec<u8>,), (RejectionCode, String)> =
        call(candid::Principal::management_canister(), "raw_rand", ()).await;

    let random_id = match result {
        Ok((id,)) => id,
        Err((code, msg)) => {
            ic_cdk::println!("Error generating random ID: {:?}, message: {}", code, msg);
            return Err(format!("Failed to generate random ID: {}", msg));
        }
    };

    if random_id.len() < 8 {
        ic_cdk::println!("Not enough bytes to generate a contest ID");
        return Err("Not enough bytes to generate contest ID".to_string());
    }

    let random_id = u64::from_le_bytes(
        random_id[0..8]
            .try_into()
            .expect("slice with incorrect length"),
    );

    Ok(random_id)
}

pub fn validate_stage(
    contest_id: u64,
    valid_stages: Vec<ContestStage>,
) -> Result<(), ContestError> {
    with_management(|management| {
        let management = management.borrow();

        for stage in valid_stages {
            let stage_list = match stage {
                ContestStage::Waiting => &management.contest_stages.waiting,
                ContestStage::Lobby => &management.contest_stages.lobby,
                ContestStage::Jury => &management.contest_stages.jury,
                ContestStage::Live => &management.contest_stages.live,
                ContestStage::Finished => &management.contest_stages.finished,
                ContestStage::Paid => &management.contest_stages.paid,
                ContestStage::Canceled => &management.contest_stages.canceled,
                ContestStage::Archived => &management.contest_stages.archived,
            };

            if stage_list.contains(&contest_id) {
                return Ok(());
            }
        }

        Err(ContestError::InvalidStageTransition)
    })
}
