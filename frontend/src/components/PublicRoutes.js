import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import PrivateRoute from "./PrivateRoute";

export default function PublicRoutes({ login, signup }) {
    return (
        <div className="pt-5">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/companies" element={<PrivateRoute element={CompanyList} />} />
                <Route path="/jobs" element={<PrivateRoute element={JobList} />} />
                <Route path="/companies/:handle" element={<PrivateRoute element={CompanyDetail} />} />
                <Route path="/profile" element={<PrivateRoute element={ProfileForm} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}
