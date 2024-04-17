import React from "react";
import "./NavBar.css";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar() {
  return (
    <div>
      <Navbar expand="md" className="bg-dark">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav tabs >
          <NavItem>
            <NavLink to="/companies"className="nav-link">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs" className="nav-link">Jobs</NavLink>
          </NavItem>
          <NavItem>
          <NavLink to="/login" className="nav-link">Login</NavLink>
          <NavItem>
          <NavLink to="/signup"className="nav-link">Signup</NavLink>
          </NavItem>
          <NavItem>
          <NavLink to="/profile"className="nav-link">Profile</NavLink>
          </NavItem>

          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
