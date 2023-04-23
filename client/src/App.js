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
import SelectAccountLogin from "./pages/SelectAccountLogin";
import SelectPatient from "./pages/SelectPatient"
import Loginpage from "./pages/Loginpage";
import Signup from "./components/Authentication/Signup";
import UserLandingPage from "./pages/UserLandingPage";
import Prescription from "./pages/Prescription";
import DoctorLandingPage from "./pages/DoctorLandingPage";
import DoctorRegister from "./pages/DoctorRegister"
import DoctorLogin from "./pages/DoctorLogin";
import DoctorPrescription from "./pages/DoctorPrescription";
import CurrentMedicines from "./pages/CurrentMedicines";
import  DCurrentMedicines from "./pages/DCurrentMedicines";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/selectaccount" element={<SelectAccountLogin />} />
<Route path="/login" element={<Loginpage />} />
<Route path="/signup" element={<Signup />} />

<Route path="/doctorlogin" element={<DoctorLogin />} />
<Route path="/doctorsignup" element={<DoctorRegister />} />
<Route path="/doctor/selectpatient" element={<SelectPatient />} />
<Route path="/doctor/prescription" element={<DoctorPrescription />} />
<Route path="/doctor/currentmedicines" element={<DCurrentMedicines />} />
        {/* <Route path="/login" element={<Homepage />} /> */}
        <Route path="/user" element={<UserLandingPage />} />
        <Route path="/user/prescription" element={<Prescription />} />
 <Route path="/user/currentmedicines" element={<CurrentMedicines />} />


        <Route path="/doctor" element={<DoctorLandingPage />} />

        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
