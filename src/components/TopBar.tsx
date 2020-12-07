import * as React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../helpers/Auth";

library.add(faUserCircle);

export const TopBar = () => {
  let auth = useAuth();

  let logout = () => {
    auth.signout()
  }

  return <Navbar bg="light" variant="light">
    <Nav className="ml-auto">
      <NavDropdown alignRight title={<span><FontAwesomeIcon icon="user-circle" /> Username</span>} id="nav-dropdown">
        <Link to="/settings" className="dropdown-item">Settings</Link>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
}