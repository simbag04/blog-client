import { Main } from "./Main";
import { createContext } from "react";

export const ApiContext = createContext();

function App() {
  return (
    <div className="App">
      <ApiContext.Provider value={ "https://pronghorn-leg-warmers.cyclic.app" }>
        <Main></Main>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
