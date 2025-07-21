import { useState, useEffect } from "react";
import Background from "./Components/Background";
import { Analytics } from "@vercel/analytics/react";
// import Mice from "./Components/Mice";
const App = () => {
      const [progress, setProgress] = useState(0);
      const [loaded, setLoaded] = useState(false);

      useEffect(() => {
            // 1) Gather all static resources
            const imgs = Array.from(document.images);
            const scripts = Array.from(document.scripts).filter((s) => s.src);
            const links = Array.from(document.querySelectorAll("link[rel='stylesheet']"));
            const resources = [...imgs, ...scripts, ...links];

            const total = resources.length;
            let count = 0;

            function update() {
                  count++;
                  setProgress(Math.round((count / total) * 100));
            }

            resources.forEach((el) => {
                  if (el.complete || (el.tagName === "SCRIPT" && el.readyState === "complete")) {
                        update();
                  } else {
                        el.addEventListener("load", update);
                        el.addEventListener("error", update);
                  }
            });

            // 2) On full window load
            window.addEventListener("load", () => {
                  // ensure 100%
                  setProgress(100);
                  setTimeout(() => setLoaded(true), 300);
            });
      }, []);

      return (
            <>
                  {loaded ? (
                        <>
                              <Analytics />
                              <Background />
                        </>
                  ) : (
                        <div className="w-screen grid place-content-center h-screen bg-zinc-800">
                              <h1 className="text-3xl text-zinc-100 font-semibold">{progress}%</h1>
                        </div>
                        // <Mice />
                  )}
            </>
      );
};

export default App;
