import { useState } from "react";
import Background from "./Components/Background";
import Loader from "./Components/Loader";

const App = () => {
      const [isLoading, setIsLoading] = useState(true);
      window.addEventListener("load", () => {
            setTimeout(() => {
                  setIsLoading(false);
            }, 1000);
      });
      return <>{isLoading ? <Loader /> : <Background />}</>;
};

export default App;
