import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyCollaboration = () => {
  const {
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [collabProjects, setCollabProjects] = useState([]);

  useEffect(() => {
    if (userRole === "student" && userEmail) {
      fetch(`http://localhost:5000/student?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === userEmail
            );
            if (matchingUser) {
              setLoggedStudent(matchingUser);
            }
          }
        });
    }

    fetch("http://localhost:5000/student/collaborate")
      .then((res) => res.json())
      .then((collaborations) => {
        const userCollabs = collaborations.filter(
          (collab) => collab.student.email === userEmail
        );
        setCollabProjects(userCollabs);
      });
  }, []);

  //   const handleSubmission = (projectId) => {
  //     alert(`Submitting project with ID ${projectId}`);
  //   };

  return (
    <div>
      {collabProjects && collabProjects.length > 0 && (
        <div className="p-4 my-10 mx-auto">
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Your Collaborated Projects
          </h1>
          <div className="flex flex-wrap justify-center">
            {collabProjects.map((collab) => (
              <div
                key={collab._id}
                className="bg-gradient-to-b from-teal-50 to-slate-300  border-2 rounded-lg p-4 m-6 shadow-md relative"
              >
                <button className="absolute top-2 right-2 bg-blue-700 text-white py-1 px-2 rounded">
                  {collab.project.submitLastDate}
                </button>
                <h2 className="text-lg font-semibold mb-2">
                  {collab.project.project}
                </h2>
                <p>
                  <span className="text-md font-bold text-green-800">
                    Batch:
                  </span>{" "}
                  {collab.project.batch}
                </p>
                <p>
                  <span className="text-md font-bold text-green-800">
                    Class:
                  </span>{" "}
                  {collab.project.grade}
                </p>
                <p>
                  <span className="text-md font-bold text-green-800">
                    Subject:
                  </span>{" "}
                  {collab.project.time}
                </p>
                <p className="capitalize font-bold">
                  <span className="text-md font-bold text-green-800">
                    Type:
                  </span>{" "}
                  {collab.project.type}
                </p>
                <p>
                  <span className="text-md font-bold text-green-800">
                    Expected Outcome:
                  </span>{" "}
                  {collab.project.expectedOutcome}
                </p>
                <p>
                  <span className="text-md font-bold text-green-800">
                    Last day of Submit:
                  </span>{" "}
                  {collab.project.submitLastDate}
                </p>
                <p>
                  <span className="text-md font-bold text-green-800">
                    Teacher Name:
                  </span>{" "}
                  {collab.project.teacherName}
                </p>
                <p>
                  <span className="text-md font-bold text-green-800">
                    Teacher Email:
                  </span>{" "}
                  {collab.project.teacherEmail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollaboration;
