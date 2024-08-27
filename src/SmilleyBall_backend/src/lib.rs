#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn first_pipeline_test() {
        assert_eq!(greet(String::from("Pablo")), "Hello, Pablo!");
    }
}
