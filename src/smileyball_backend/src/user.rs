use ic_cdk::api::time;

pub struct User {
    pub username: String,
    pub created_at: u64,
    pub is_active: bool,
    pub is_admin: bool,
    pub avatar_url: Option<String>,
}

impl User {
    pub fn new(username: String) -> Self {
        Self {
            username,
            created_at: time(),
            is_active: true,
            is_admin: false,
            avatar_url: None,
        }
    }
}
