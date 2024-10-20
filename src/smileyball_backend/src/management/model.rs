use candid::CandidType;
use candid::Principal;
use serde::Deserialize;

#[derive(Debug, Deserialize, CandidType, Clone, Copy)]
pub enum ContestStage {
    Waiting,
    Lobby,
    Jury,
    Live,
    Finished,
    Paid,
    Canceled,
    Archived,
}

#[derive(Debug, Deserialize, CandidType, Clone, Copy)]
pub enum UserRole {
    SuperAdmin,
    Admin,
    Jury,
}

#[derive(Clone, Deserialize, CandidType, Debug, Default)]
pub struct ManagementData {
    pub contest_stages: ContestStages,
    pub restricted_methods: Vec<RestrictedMethod>,
    pub operations: Vec<Operation>,
    pub roles: Roles,
}

#[derive(Clone, Deserialize, CandidType, Debug, Default)]
pub struct ContestStages {
    pub waiting: Vec<u64>,
    pub lobby: Vec<u64>,
    pub jury: Vec<u64>,
    pub live: Vec<u64>,
    pub finished: Vec<u64>,
    pub paid: Vec<u64>,
    pub canceled: Vec<u64>,
    pub archived: Vec<u64>,
}

#[derive(Clone, Deserialize, CandidType, Debug)]
pub struct RestrictedMethod {
    pub method_name: String,
    pub allowance: Vec<String>, // Roles that can access this method, e.g., ["jury", "admin"]
}

#[derive(Clone, Deserialize, CandidType, Debug)]
pub struct Operation {
    pub who: Principal,
    pub what: OperationDetails,
    pub when: u64, // DATETIME representation
}

#[derive(Clone, Deserialize, CandidType, Debug)]
pub struct OperationDetails {
    pub pre_change_state: String,
    pub post_change_state: String,
}

#[derive(Clone, Deserialize, CandidType, Debug, Default)]
pub struct Roles {
    pub super_admin: Vec<Principal>,
    pub admin: Vec<Principal>,
    pub jury: Vec<Principal>,
}

#[derive(Clone, Deserialize, CandidType, Debug, Default)]
pub struct GetContestStagesResponse {
    pub contest_stages: ContestStages,
}
