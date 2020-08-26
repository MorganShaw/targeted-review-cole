
import React from "react";
import routes from "./routes";
import Nav from "./Components/Nav";
import "./App.css";

function App() {
  return (
    <div>
      <Nav />
      {routes}
    </div>
  );
}

export default App;
