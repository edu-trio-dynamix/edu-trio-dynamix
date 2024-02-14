import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Home/Landing";
import Navbar from "./Components/Shared/Navbar";
import TeacherRegistrationForm from "./Components/Login/TeacherRegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentRegistrationForm from "./Components/Login/StudentRegistrationForm";
import Login from "./Components/Login/Login";
import Error from "./Components/Error/Error";
import TeacherProfile from "./Components/Teacher/TeacherProfile/TeacherProfile";
import TeacherCourse from "./Components/Teacher/TeacherCourse/TeacherCourse";
import TeacherProject from "./Components/Teacher/TeacherProject/TeacherProject";
import TeacherAssignment from "./Components/Teacher/TeacherAssignment/TeacherAssignment";
import TeacherResource from "./Components/Teacher/TeacherResource/TeacherResource";
import Container from "./Components/WhiteBoard/Container/Container";
import StudentCourse from "./Components/Student/StudentCourse/StudentCourse";
import StudentProfile from "./Components/Student/StudentProfile/StudentProfile";
import StudentAssignment from "./Components/Student/StudentAssignment/StudentAssignment";
import StudentResource from "./Components/Student/StudentResource/StudentResource";
import StudentProject from "./Components/Student/StudentProject/StudentProject";
import ViewStudents from "./Components/Teacher/TeacherProject/ViewStudents";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<Container />} />

        {/* teacher  */}
        <Route
          path="/teacherRegistrationForm"
          element={<TeacherRegistrationForm />}
        />
        <Route path="/teacherProfile" element={<TeacherProfile />} />
        <Route path="/teacherCourse" element={<TeacherCourse />} />
        <Route path="/teacherAssignment" element={<TeacherAssignment />} />
        <Route path="/teacherResource" element={<TeacherResource />} />
        <Route path="/teacherProject" element={<TeacherProject />} />
        <Route
          path="/teacherProjectViewStudent/:id"
          element={<ViewStudents />}
        />

        {/* student  */}
        <Route
          path="/studentRegistrationForm"
          element={<StudentRegistrationForm />}
        />
        <Route path="/studentProfile" element={<StudentProfile />} />
        <Route path="/studentCourse" element={<StudentCourse />} />
        <Route path="/studentAssignment" element={<StudentAssignment />} />
        <Route path="/studentResource" element={<StudentResource />} />
        <Route path="/studentProject" element={<StudentProject />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
