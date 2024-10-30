use crate::contest::model::contest::OptionalStages;
use crate::contest::model::lobby::Duration;

pub const MIN_SONG_AMOUNT: u32 = 0;
pub const MAX_SONG_AMOUNT: u32 = 30;
pub const PRICE_POOL_INIT: u64 = 0;
pub const OPTIONAL_STAGES_INIT: OptionalStages = OptionalStages {
    lobby: true,
    jury: true,
};

pub const DEFAULT_LOBBY_DURATION: Duration = Duration::ThreeDays;
