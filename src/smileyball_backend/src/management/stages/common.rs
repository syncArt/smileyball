use crate::contest::model::contest::ContestData;
use crate::contest::model::error::{ContestError, UpdateError};
use crate::contest::model::lobby::{Duration, Lobby};
use std::time::Duration as StdDuration;

pub fn calculate_deadline(duration: Duration) -> Option<u64> {
    let now = ic_cdk::api::time();

    match duration {
        Duration::ThreeDays => {
            Some(now + StdDuration::from_secs(3 * 24 * 60 * 60).as_nanos() as u64)
        }
        Duration::OneWeek => Some(now + StdDuration::from_secs(7 * 24 * 60 * 60).as_nanos() as u64),
        Duration::TwoWeeks => {
            Some(now + StdDuration::from_secs(14 * 24 * 60 * 60).as_nanos() as u64)
        }
    }
}

pub fn set_submission_deadline(lobby: &mut Lobby) {
    lobby.submission_deadline = calculate_deadline(lobby.duration);
}

pub fn transfer_lobby_songs_to_contest(contest: &mut ContestData) -> Result<(), ContestError> {
    if let Some(ref lobby) = contest.lobby {
        if let Some(ref mut live) = contest.live {
            live.contest_songs = Some(
                lobby
                    .move_songs_to_live()
                    .map_err(|e| ContestError::UpdateError(UpdateError::new(e)))?,
            );
            Ok(())
        } else {
            Err(ContestError::InvalidStage)
        }
    } else {
        Err(ContestError::InvalidStage)
    }
}
