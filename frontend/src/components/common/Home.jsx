import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import AllCourses from './AllCourses';

const Home = () => {
   const [displayedText, setDisplayedText] = useState('');
   const textToAnimate = "Learning online opens the door to knowledge without boundaries, empowering minds to grow anytime, anywhere.";

   useEffect(() => {
      let currentIndex = 0;

      const interval = setInterval(() => {
         if (currentIndex < textToAnimate.length) {
            setDisplayedText((prev) => prev + textToAnimate[currentIndex]);
            currentIndex++;
         } else {
            clearInterval(interval);
         }
      }, 100); // Adjust the speed of the animation here

      return () => clearInterval(interval);
   }, [textToAnimate]);

   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2><b>EXPLORE</b></h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                  </Nav>
                  <Nav>
                     <Link to={'/'} className="nav-link"><b>Home</b></Link>
                     <Link to={'/login'} className="nav-link"><b>Login</b></Link>
                     <Link to={'/register'} className="nav-link"><b>Register</b></Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div id='home-container' className='first-container'>
            <div className="content-home">
               <p className="animated-text">{displayedText}</p>
               <Link to={'/register'}>
                  <Button variant='warning' className='m-2' size='md'>
                     Explore Courses
                  </Button>
               </Link>
            </div>
         </div>

         <Container className="second-container">
            <h2 className="text-center my-4">Trending Courses</h2>
            <AllCourses />
         </Container>
      </>
   );
};

export default Home;
