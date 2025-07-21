import { useState, useEffect } from "react";
import Background from "./Components/Background";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
      const [progress, setProgress] = useState(0);
      const [loaded, setLoaded] = useState(false);

      useEffect(() => {
            const imgs = Array.from(document.images);
            const scripts = Array.from(document.scripts).filter((s) => s.src);
            const links = Array.from(document.querySelectorAll("link[rel='stylesheet']"));
            const resources = [...imgs, ...scripts, ...links];

            const total = resources.length;
            let count = 0;

            function update() {
                  count++;
                  const percent = Math.round((count / total) * 100);
                  setProgress((prev) => (percent > prev ? percent : prev));

                  if (count >= total) {
                        setTimeout(() => setLoaded(true), 300);
                  }
            }

            resources.forEach((el) => {
                  if (el.complete || (el.tagName === "SCRIPT" && el.readyState === "complete")) {
                        update();
                  } else {
                        el.addEventListener("load", update);
                        el.addEventListener("error", update);
                  }
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
                  )}
            </>
      );
};

export default App;
