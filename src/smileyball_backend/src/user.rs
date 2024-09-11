use chrono::{DateTime, Utc};

pub struct User {
    pub username: String,
    pub created_at: DateTime<Utc>,
    pub is_active: bool,
    pub is_admin: bool,
    pub avatar_url: Option<String>,
}

impl User {
    pub fn new(username: String) -> Self {
        Self {
            username,
            created_at: Utc::now(),
            is_active: true,
            is_admin: false,
            avatar_url: None,
        }
    }
}
