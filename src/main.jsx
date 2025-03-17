import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MusicPlaying from "./Contexts/PlayingMusic.jsx";
createRoot(document.getElementById("root")).render(
      <MusicPlaying>
            <App />
      </MusicPlaying>
);
