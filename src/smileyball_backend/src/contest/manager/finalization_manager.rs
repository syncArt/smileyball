use crate::contest::model::contest::ContestData;
use crate::contest::model::vote::ContestResultData;

impl ContestData {
    pub fn finalize_contest(&mut self) -> Result<(), String> {
        if let Some(ref contest_songs) = self.contest_songs {
            let mut results: Vec<ContestResultData> = vec![];

            for song_data in contest_songs.values() {
                let votes_amount = song_data.contest_votes.len() as u32;
                let votes_average = song_data
                    .contest_votes
                    .values()
                    .map(|v| v.vote as u32)
                    .sum::<u32>() as f32
                    / votes_amount as f32;

                let result = ContestResultData {
                    position: 0,
                    votes_amount,
                    votes_average,
                    top_voters: song_data.contest_votes.values().cloned().collect(),
                    finished_at: Some(ic_cdk::api::time().to_string()),
                    closed_by: Some(ic_cdk::api::caller()),
                };

                results.push(result);
            }

            results.sort_by(|a, b| b.votes_average.partial_cmp(&a.votes_average).unwrap());

            for (i, result) in results.iter_mut().enumerate() {
                result.position = (i + 1) as u32;
            }

            self.contest_results = Some(results);

            Ok(())
        } else {
            Err("No songs available for summary.".to_string())
        }
    }
}
