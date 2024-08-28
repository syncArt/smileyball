import {FormEvent, useState} from "react";
import { smileyball_backend } from "../../declarations/smileyball_backend";

function App() {
  const [greeting, setGreeting] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const name = (event.currentTarget.elements.namedItem('name') as HTMLInputElement)?.value || '';

        smileyball_backend.greet(name).then((responseGreeting) => {
            setGreeting(responseGreeting);
        });

        return false;
    }

  return (
    <main>
        test
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
