import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink, useNavigate } from 'react-router-dom';
const NavBar = () => {
   const user = useContext(UserContext);
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
   };

   if (!user) {
      return null;
   }

   return (
      <Navbar expand="lg" className="navbar-custom">
         <Container fluid>
            <Navbar.Brand>
               <h3 className="navbar-brand-text">EXPLORE</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0 navbar-links">
                  <NavLink to="/dashboard/" className="nav-link-custom">Home</NavLink>

                  {user.userData.type === 'Teacher' && (
                     <NavLink to="/dashboard/addcourse" className="nav-link-custom">Add Course</NavLink>
                  )}
                  
                  {user.userData.type === 'Admin' && (
                     <NavLink to="/dashboard/courses" className="nav-link-custom">Courses</NavLink>
                  )}
                  
                  {user.userData.type === 'Student' && (
                     <NavLink to="/dashboard/enrolledcourses" className="nav-link-custom">Enrolled Courses</NavLink>
                  )}
               </Nav>
               <Nav>
                  <h5 className="navbar-user">Hi, {user.userData.name}</h5>
                  <Button onClick={handleLogout} size="sm" variant="outline-danger" className="logout-btn">
                     Log Out
                  </Button>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default NavBar;
