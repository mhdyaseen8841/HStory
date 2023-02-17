import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import Landing from "./pages/index";
import NotFoundPage from "./pages/404/NotFoundPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Homepage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Landing />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
