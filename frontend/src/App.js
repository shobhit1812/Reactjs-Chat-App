import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";
import "./App.css"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;


 