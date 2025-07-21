import { useState, useEffect } from "react";
import Background from "./Components/Background";
import { Analytics } from "@vercel/analytics/react";
import Mice from "./Components/Mice";
const App = () => {
      const [appLoaded, setAppLoaded] = useState(false);
      useEffect(() => {
            const onLoad = () => setAppLoaded(true);
            if (document.readyState === "complete") {
                  onLoad();
            } else {
                  window.addEventListener("load", onLoad);
                  return () => window.removeEventListener("load", onLoad);
            }
      }, []);

      return (
            <>
                  {appLoaded ? (
                        <>
                              <Analytics />
                              <Background />
                        </>
                  ) : (
                        <Mice />
                  )}
            </>
      );
};

export default App;
