import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/AxiosInstance';
import { Link } from 'react-router-dom';
import {
   Button,
   styled,
   TableRow,
   TableHead,
   TableContainer,
   Paper,
   Table,
   TableBody,
   TableCell,
   tableCellClasses
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

const EnrolledCourses = () => {
   const [allEnrolledCourese, setAllEnrolledCourses] = useState([]);
   const [loading, setLoading] = useState(true);

   const allCourses = async () => {
      try {
         const res = await axiosInstance.get('api/user/getallcoursesuser', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });
         if (res.data.success) {
            setAllEnrolledCourses(res.data.data || []);
         } else {
            alert(res.data.message);
         }
      } catch (error) {
         console.error("Error fetching courses:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      allCourses();
   }, []);

   if (loading) {
      return <p>Loading enrolled courses...</p>;
   }

   return (
      <>
         {allEnrolledCourese.length === 0 ? (
            <p className="px-2">You have not enrolled in any courses yet.</p>
         ) : (
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                     <TableRow>
                        <StyledTableCell>Course ID</StyledTableCell>
                        <StyledTableCell align="left">Course Name</StyledTableCell>
                        <StyledTableCell align="left">Course Educator</StyledTableCell>
                        <StyledTableCell align="left">Course Category</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {allEnrolledCourese.map((course) => (
                        <StyledTableRow key={course?._id || Math.random()}>
                           <StyledTableCell component="th" scope="row">
                              {course?._id || "N/A"}
                           </StyledTableCell>
                           <StyledTableCell align="left">
                              {course?.C_title || "N/A"}
                           </StyledTableCell>
                           <StyledTableCell align="left">
                              {course?.C_educator || "N/A"}
                           </StyledTableCell>
                           <StyledTableCell align="left">
                              {course?.C_categories || "N/A"}
                           </StyledTableCell>
                           <StyledTableCell align="left">
                              {course?._id ? (
                                 <Link to={`/courseSection/${course._id}/${course.C_title}`}>
                                    <Button size="small" variant="contained" color="success">
                                       Go To
                                    </Button>
                                 </Link>
                              ) : (
                                 "N/A"
                              )}
                           </StyledTableCell>
                        </StyledTableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         )}
      </>
   );
};

export default EnrolledCourses;
