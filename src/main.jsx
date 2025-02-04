import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MusicContext from "./Contexts/MusicState.jsx";
import MusicPlaying from "./Contexts/PlayingMusic.jsx";

createRoot(document.getElementById("root")).render(
      <MusicContext>
            <MusicPlaying>
                  <App />
            </MusicPlaying>
      </MusicContext>
);
