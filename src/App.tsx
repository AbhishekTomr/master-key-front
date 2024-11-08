import { useContext, useEffect, useMemo } from "react";
import "./App.css";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Header from "./components/Layouts/Header";
import {
  IUserContext,
  UserContext,
  UserContextProvider,
} from "./context/user.context";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header />
        <AppWrapper />
      </UserContextProvider>
    </div>
  );
}

export default App;
