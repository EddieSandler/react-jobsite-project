import React from "react";
import NavBar from "./NavBar";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Companies from "./components/Companies.jsx";
import Jobs from "./components/Jobs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Company from "./components/Company";

import './App.css';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <NavBar />

        <Routes>
          <Route path="/" element={
            <>
              <h1>REACT_JOBLY</h1>
              <p>All the jobs in one convenient place.</p>
              <h2>Welcome!</h2>
            </>
          } />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:company" element={<Companies />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
