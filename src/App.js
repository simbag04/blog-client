import { Main } from "./Main";
import { createContext } from "react";

export const ApiContext = createContext();

function App() {
  return (
    <div className="App">
      <ApiContext.Provider value={ "http://localhost:5000" }>
        <Main></Main>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
