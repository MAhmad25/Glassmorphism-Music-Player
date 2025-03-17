import Background from "./Components/Background";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
const App = () => {
      return (
            <>
                  <Analytics />
                  <SpeedInsights />
                  <Background />
            </>
      );
};

export default App;
