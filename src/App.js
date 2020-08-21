import React from "react";
import routes from "./routes";
import "./App.css";
import Nav from './Components/Nav';

function App() {
  return (
    <div>
      <Nav />
      {routes}
    </div>
  );
}

export default App;
