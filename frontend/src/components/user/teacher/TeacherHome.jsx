import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../common/AxiosInstance';
import './Teacher.css'; // Import your custom CSS
const TeacherHome = () => {
   const [allCourses, setAllCourses] = useState([]);

   const getAllCoursesUser = async () => {
      try {
         const res = await axiosInstance.get(`api/user/getallcoursesteacher`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            setAllCourses(res.data.data);
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   };

   useEffect(() => {
      getAllCoursesUser();
   }, []);

   const toggleDescription = (courseId) => {
      setAllCourses((prevCourses) =>
         prevCourses.map((course) =>
            course._id === courseId
               ? { ...course, showFullDescription: !course.showFullDescription }
               : course
         )
      );
   };

   const deleteCourse = async (courseId) => {
      const confirmation = confirm('Are you sure you want to delete this course?');
      if (!confirmation) {
         return;
      }
      try {
         const res = await axiosInstance.delete(`api/user/deletecourse/${courseId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            alert(res.data.message);
            getAllCoursesUser();
         } else {
            alert('Failed to delete the course');
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   };

   return (
      <Container className="mt-4">
         <h3 className="text-center mb-4">Your Courses</h3>
         <Row className="g-4">
            {allCourses?.length > 0 ? (
               allCourses.map((course) => (
                  <Col key={course._id} md={6} lg={4}>
                     <Card className="custom-card h-100 shadow border-0">
                        <Card.Body>
                           <Card.Title className="text-primary">{course.C_title}</Card.Title>
                           <Card.Text>
                              <p>
                                 <strong>Description: </strong>
                                 {course.showFullDescription
                                    ? course.C_description
                                    : course.C_description.slice(0, 50)}{' '}
                                 {course.C_description.length > 50 && (
                                    <span
                                       className="text-primary fw-bold"
                                       style={{ cursor: 'pointer' }}
                                       onClick={() => toggleDescription(course._id)}
                                    >
                                       {course.showFullDescription ? 'Read Less' : 'Read More'}
                                    </span>
                                 )}
                              </p>
                              <p>
                                 <strong>Category: </strong>
                                 {course.C_categories}
                              </p>
                              <p>
                                 <strong>Sections: </strong> {course.sections.length}
                              </p>
                              <p className="text-muted">
                                 <strong>Enrolled students: </strong> {course.enrolled}
                              </p>
                           </Card.Text>
                           <div className="d-flex justify-content-end">
                              <Button
                                 variant="danger"
                                 size="sm"
                                 onClick={() => deleteCourse(course._id)}
                              >
                                 Delete
                              </Button>
                           </div>
                        </Card.Body>
                     </Card>
                  </Col>
               ))
            ) : (
               <p className="text-center text-muted">No courses found!</p>
            )}
         </Row>
      </Container>
   );
};

export default TeacherHome;
