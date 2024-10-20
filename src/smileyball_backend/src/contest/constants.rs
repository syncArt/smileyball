use crate::contest::model::stage::OptionalStages;

pub const MIN_SONG_AMOUNT: u32 = 15;
pub const MAX_SONG_AMOUNT: u32 = 30;
pub const PRICE_POOL_INIT: u64 = 0;
pub const OPTIONAL_STAGES_INIT: OptionalStages = OptionalStages {
    lobby: true,
    jury: true,
};
