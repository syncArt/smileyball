use crate::management::model::{
    ContestStage, Operation, OperationDetails, RestrictedMethod, UserRole,
};
use crate::management::repository::{
    add_operation, assign_role as repo_assign_role, get_management_data,
    remove_role as repo_remove_role, update_contest_stage as repo_update_contest_stage,
};
use crate::with_management;
use candid::Principal;

pub fn change_contest_stage(
    stage: ContestStage,
    contest_id: u64,
    caller: Principal,
) -> Result<(), String> {
    let management = get_management_data();
    if management.roles.admin.contains(&caller) {
        repo_update_contest_stage(stage, contest_id);
        let operation = Operation {
            who: caller,
            what: OperationDetails {
                pre_change_state: format!("Change stage to {:?}", stage),
                post_change_state: format!("Contest ID {} stage updated", contest_id),
            },
            when: ic_cdk::api::time(),
        };
        add_operation(operation);
        Ok(())
    } else {
        Err("Permission denied: Only admin can change contest stage".into())
    }
}

pub fn assign_role(role: UserRole, principal: Principal, caller: Principal) -> Result<(), String> {
    let management = get_management_data();
    if matches!(role, UserRole::SuperAdmin) {
        if management.roles.admin.contains(&caller) {
            repo_assign_role(role, principal);
            let operation = Operation {
                who: caller,
                what: OperationDetails {
                    pre_change_state: format!("Assign {:?} role", role),
                    post_change_state: format!("Principal {:?} assigned to role", principal),
                },
                when: ic_cdk::api::time(),
            };
            add_operation(operation);
            Ok(())
        } else {
            Err("Permission denied: Only super admin can assign role".into())
        }
    } else {
        repo_assign_role(role, principal);
        Ok(())
    }
}

pub fn remove_role(role: UserRole, principal: Principal, caller: Principal) -> Result<(), String> {
    let management = get_management_data();
    if matches!(role, UserRole::SuperAdmin) {
        if management.roles.admin.contains(&caller) {
            repo_remove_role(role, principal);
            let operation = Operation {
                who: caller,
                what: OperationDetails {
                    pre_change_state: format!("Remove {:?} role", role),
                    post_change_state: format!("Principal {:?} removed from role", principal),
                },
                when: ic_cdk::api::time(),
            };
            add_operation(operation);
            Ok(())
        } else {
            Err("Permission denied: Only super admin can remove role".into())
        }
    } else {
        repo_remove_role(role, principal);
        Ok(())
    }
}

pub fn add_restricted_method(
    method_name: String,
    roles: Vec<UserRole>,
    caller: Principal,
) -> Result<(), String> {
    let management = get_management_data();
    if management.roles.admin.contains(&caller) {
        let restricted_method = RestrictedMethod {
            method_name,
            allowance: roles.into_iter().map(|r| format!("{:?}", r)).collect(),
        };
        with_management(|management| {
            let mut management = management.borrow_mut();
            management.restricted_methods.push(restricted_method);
        });
        let operation = Operation {
            who: caller,
            what: OperationDetails {
                pre_change_state: "Add restricted method".into(),
                post_change_state: "Restricted method added".into(),
            },
            when: ic_cdk::api::time(),
        };
        add_operation(operation);
        Ok(())
    } else {
        Err("Permission denied: Only admin can add restricted methods".into())
    }
}

pub fn check_permission(method_name: &str, caller: Principal) -> bool {
    let management = get_management_data();
    if let Some(method) = management
        .restricted_methods
        .iter()
        .find(|m| m.method_name == method_name)
    {
        let roles = &method.allowance;
        if roles.contains(&"SuperAdmin".to_string()) && management.roles.admin.contains(&caller) {
            return true;
        }
        if roles.contains(&"Admin".to_string()) && management.roles.admin.contains(&caller) {
            return true;
        }
        if roles.contains(&"Jury".to_string()) && management.roles.jury.contains(&caller) {
            return true;
        }
    }
    false
}
