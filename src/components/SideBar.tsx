import * as React from "react";
import { Accordion, Col, ColProps, Dropdown, Nav, Navbar, NavbarProps, NavDropdown, NavItem, NavLink } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../helpers/Auth";
import { Logo } from "../components/Logo";
import { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faTachometerAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Styles } from "../constants";

library.add(faTachometerAlt, faUsers, faBolt);

export const SideBar = (props: ColProps) => {
  let auth = useAuth();
  let location = useLocation();
  
  useEffect(() => {
    // console.log("Sidebar", auth, "active:", location.pathname);
  });

  return <Col {...props} className={props.className + " bg-" + Styles.SideBar.bg}>
    <Navbar bg={Styles.SideBar.bg} variant={Styles.SideBar.variant as NavbarProps["variant"]} className="sticky-top">
      <Nav defaultActiveKey="/" className="flex-column">
        <Navbar.Brand href="/">
          <div className="d-inline-block align-top" >
            <Logo />
          </div>              
        </Navbar.Brand>
        <Link className={"nav-link" + (location.pathname == "/" ? " active" : "")}  to="/"><FontAwesomeIcon icon="tachometer-alt" /> Dashboard</Link>
        <Link className={"nav-link" + (location.pathname == "/users" ? " active" : "")}  to="/users"><FontAwesomeIcon icon="users" /> Users</Link>
        <Link className={"nav-link" + (location.pathname == "/events" ? " active" : "")}  to="/events"><FontAwesomeIcon icon="bolt" /> Events</Link>
        <NavDropdown title="Dropdown" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  </Col>
}