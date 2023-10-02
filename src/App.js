import { Main } from "./Main";
import { createContext } from "react";

export const ApiContext = createContext();

function App() {
  return (
    <div className="App">
      <ApiContext.Provider value={ "https://blog-api-1r4y.onrender.com" }>
        <Main></Main>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
