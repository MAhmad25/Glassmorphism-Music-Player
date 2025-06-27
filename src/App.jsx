import Background from "./Components/Background";
import { Analytics } from "@vercel/analytics/react";
const App = () => {
      return (
            <>
                  <Analytics />
                  <Background />
            </>
      );
};

export default App;
