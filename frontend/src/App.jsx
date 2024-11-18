// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { useState, useEffect, createContext } from "react";

// // import "./App.css";
// // import Home from "./components/common/Home";
// // import Login from "./components/common/Login";
// // import Register from "./components/common/Register";
// // import Dashboard from "./components/common/Dashboard";
// // import CourseContent from "./components/user/student/CourseContent";

// // export const UserContext = createContext();

// // function App() {
// //   const date = new Date().getFullYear();
// //   const [userData, setUserData] = useState();
// //   const [userLoggedIn, setUserLoggedIn] = useState(false);

// //   const getData = async () => {
// //     try {
// //       const user = await JSON.parse(localStorage.getItem("user"));
// //       if (user && user !== undefined) {
// //         setUserData(user);
// //         setUserLoggedIn(true);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getData();
// //   }, []);

// //   return (
// //     <UserContext.Provider value={{ userData, userLoggedIn }}>
// //       <div className="App">
// //         <Router>
// //           <div className="content">
// //             <Routes>
// //               <Route exact path="/" element={<Home />} />
// //               <Route path="/login" element={<Login />} />
// //               <Route path="/register" element={<Register />} />
              
// //               {userLoggedIn ? (
// //                 <>
// //                   <Route path="/dashboard" element={<Dashboard />} />
// //                   <Route path="/courseSection/:courseId/:courseTitle" element={<CourseContent />} />
                  

// //                 </>
// //               ) : (
// //                 <Route path="/login" element={<Login />} />
// //               )}
// //             </Routes>
// //           </div>
// //           <footer className="bg-light text-center text-lg-start">
// //             <div className="text-center p-3">
// //               © {date} Copyright: Study App
// //             </div>
// //           </footer>
// //         </Router>
// //       </div>
// //     </UserContext.Provider>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, useEffect, createContext } from "react";
// import "./App.css";
// import Home from "./components/common/Home";
// import Login from "./components/common/Login";
// import Register from "./components/common/Register";
// import Dashboard from "./components/common/Dashboard";
// import CourseContent from "./components/user/student/CourseContent";
// import EnrolledCourses from "./components/user/student/EnrolledCourses";
// import AddCourse from "./components/user/teacher/AddCourse";  // Ensure correct import path

// export const UserContext = createContext();

// function App() {
//   const date = new Date().getFullYear();
//   const [userData, setUserData] = useState();
//   const [userLoggedIn, setUserLoggedIn] = useState(false);

//   // Retrieve user data from local storage and set states accordingly
//   const getData = async () => {
//     try {
//       const user = await JSON.parse(localStorage.getItem("user"));
//       if (user && user !== undefined) {
//         setUserData(user);
//         setUserLoggedIn(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ userData, userLoggedIn }}>
//       <div className="App">
//         <Router>
//           <div className="content">
//             <Routes>
//               {/* Public Routes */}
//               <Route exact path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />

//               {/* Protected Routes (Only accessible if user is logged in) */}
//               {userLoggedIn ? (
//                 <>
//                   <Route path="/dashboard" element={<Dashboard />} />
//                   <Route path="/courseSection/:courseId/:courseTitle" element={<CourseContent />} />
//                   <Route path="/dashboard/enrolledcourses" element={<EnrolledCourses />} />
                  
//                   {/* Ensure the Add Course route is inside the protected routes */}
//                   <Route path="/dashboard/addcourse" element={<AddCourse />} />
//                 </>
//               ) : (
//                 // If the user is not logged in, always redirect to login page
//                 <Route path="/login" element={<Login />} />
//               )}
//             </Routes>
//           </div>
//           <footer className="bg-light text-center text-lg-start">
//             <div className="text-center p-3">
//               © {date} Copyright: EXPLORE
//             </div>
//           </footer>
//         </Router>
//       </div>
//     </UserContext.Provider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";
import CourseContent from "./components/user/student/CourseContent";
import EnrolledCourses from "./components/user/student/EnrolledCourses";
import AddCourse from "./components/user/teacher/AddCourse"; // Updated path to AddCourse

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Retrieve user data from local storage and set states accordingly
  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {userLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courseSection/:courseId/:courseTitle" element={<CourseContent />} />
                  <Route path="/dashboard/enrolledcourses" element={<EnrolledCourses />} />
                  <Route path="/dashboard/addcourse" element={<AddCourse />} /> {/* Updated path to AddCourse */}
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
