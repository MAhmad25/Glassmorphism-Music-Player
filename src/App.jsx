import { useState } from "react";
import Background from "./Components/Background";
import { Analytics } from "@vercel/analytics/react";
import Mice from "./Components/Mice";
const App = () => {
      const [app, setApp] = useState(false);
      window.addEventListener("load", () => {
            setApp(true);
      });

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
