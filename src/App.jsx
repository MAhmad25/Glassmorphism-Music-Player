import { useEffect, useState } from "react";
import Background from "./Components/Background";
import { Analytics } from "@vercel/analytics/react";
import Mice from "./Components/Mice";
const App = () => {
      const [app, setApp] = useState(false);

      useEffect(() => {
            window.addEventListener("load", () => {
                  setApp(true);
            });
            return () => {
                  window.removeEventListener("load", () => {
                        setApp(true);
                  });
            };
      }, []);

      return (
            <>
                  {app ? (
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
