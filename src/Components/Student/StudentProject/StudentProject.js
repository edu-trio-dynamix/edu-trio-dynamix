import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const StudentProject = () => {
  const {
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [projects, setProjects] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [searchOutcome, setSearchOutcome] = useState("");
  const [searchGrade, setSearchGrade] = useState("");
  const [searchType, setSearchType] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

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

    fetch("http://localhost:5000/teacher/project")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // Filter projects based on search criteria
  const filteredProjects = projects.filter((project) => {
    if (
      (searchTerm &&
        project?.project.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (searchSkills &&
        project?.skills &&
        project.skills.toLowerCase().includes(searchSkills.toLowerCase())) ||
      (searchOutcome &&
        project?.expectedOutcome
          .toLowerCase()
          .includes(searchOutcome.toLowerCase())) ||
      (searchGrade &&
        project?.grade.toLowerCase().includes(searchGrade.toLowerCase())) ||
      (searchType &&
        project?.type.toLowerCase().includes(searchType.toLowerCase()))
    ) {
      return true;
    }
    return false;
  });

  const handleModal = (project) => {
    setSelectedProject(project);
    const modal = document.getElementById("student_project");
    modal.showModal();
  };

  const handleSignup = (project) => {
    if (loggedStudent.gradeYear !== project.grade) {
      alert("You are not eligible for this project.");
      return;
    }

    if (!project) {
      alert("Project data is invalid.");
      return;
    }
    console.log(project);
    const applicationData = {
      student: loggedStudent,
      project: selectedProject,
    };

    fetch("http://localhost:5000/student/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Application successful", data);
        setSelectedProject(project);
        document.getElementById("student_project").close();
      });
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    setPdfData(file);
  };

  return (
    <div>
      <div className="flex flex-wrap bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 ">
        <div className=" p-4 my-10 mx-auto">
          <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
            Search for Project by name
          </h1>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-col w-full mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-2"
              />{" "}
              <input
                type="text"
                placeholder="Search by project name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search by skills"
                value={searchSkills}
                onChange={(e) => setSearchSkills(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search by expected outcome"
                value={searchOutcome}
                onChange={(e) => setSearchOutcome(e.target.value)}
              />
              <select
                value={searchGrade}
                onChange={(e) => setSearchGrade(e.target.value)}
              >
                <option value="">Select grade</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
              </select>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="group">Group</option>
                <option value="individual">Individual</option>
              </select>
            </div>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-b from-pink-50 to-blue-300 border-gray-300 rounded-lg p-4 m-4 w-96 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {project?.project}
                </h2>
                <p>
                  <strong className="text-black font-bold">Batch:</strong>{" "}
                  {project?.batch}
                </p>
                <p>
                  <strong className="text-black font-bold">Class:</strong>{" "}
                  {project?.grade}
                </p>
                <p>
                  <strong className="text-black font-bold">Subject:</strong>{" "}
                  {project?.time}
                </p>
                <p>
                  <strong className="text-black font-bold">Type:</strong>{" "}
                  {project?.type}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">
                    Expected Outcome:
                  </strong>{" "}
                  {project?.expectedOutcome}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Last day of Submit:
                  </strong>{" "}
                  {project.submitLastDate}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Name:
                  </strong>{" "}
                  {project.teacherName}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">
                    Teacher Email:
                  </strong>{" "}
                  {project.teacherEmail}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => handleModal(project)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "13rem",
                      overflow: "hidden",
                      height: "3rem",
                      backgroundSize: "300% 300%",
                      backdropFilter: "blur(1rem)",
                      borderRadius: "5rem",
                      transition: "0.5s",
                      border: "double 4px transparent",
                      backgroundImage:
                        "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "content-box, border-box",
                      animation: "gradient_301 5s ease infinite",
                    }}
                  >
                    <strong
                      style={{
                        zIndex: 2,
                        fontFamily: "Avalors Personal Use",
                        fontSize: "12px",
                        letterSpacing: "5px",
                        color: "#FFFFFF",
                        textShadow: "0 0 4px white",
                      }}
                    >
                      DETAILS
                    </strong>
                    <div
                      id="container-stars"
                      style={{
                        position: "absolute",
                        zIndex: -1,
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        transition: "0.5s",
                        backdropFilter: "blur(1rem)",
                        borderRadius: "5rem",
                      }}
                    >
                      <div
                        id="stars"
                        style={{
                          position: "relative",
                          background: "transparent",
                          width: "200rem",
                          height: "200rem",
                          animation: "animStarRotate 90s linear infinite",
                        }}
                      ></div>
                    </div>
                    <div
                      id="glow"
                      style={{
                        position: "absolute",
                        display: "flex",
                        width: "12rem",
                      }}
                    >
                      <div
                        className="circle"
                        style={{
                          width: "100%",
                          height: "30px",
                          filter: "blur(2rem)",
                          animation: "pulse_3011 4s infinite",
                          zIndex: -1,
                        }}
                      ></div>
                      <div
                        className="circle"
                        style={{
                          width: "100%",
                          height: "30px",
                          filter: "blur(2rem)",
                          animation: "pulse_3011 4s infinite",
                          zIndex: -1,
                        }}
                      ></div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 my-10 mx-auto">
          <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
            ALL Projects
          </h1>
          <div className="flex flex-wrap justify-center">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 w-96 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {project.project}
                </h2>
                <p>
                  <strong className="text-black font-bold">Batch:</strong>{" "}
                  {project.batch}
                </p>
                <p>
                  <strong className="text-black font-bold">Class:</strong>{" "}
                  {project.grade}
                </p>
                <p>
                  <strong className="text-black font-bold">Subject:</strong>{" "}
                  {project.time}
                </p>
                <p>
                  <strong className="text-black font-bold">Type:</strong>{" "}
                  {project.type}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Expected Outcome:
                  </strong>{" "}
                  {project.expectedOutcome}
                </p>
                <p>
                  <strong className="text-black font-bold">Skills:</strong>{" "}
                  {project?.skills}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Last day of Submit:
                  </strong>{" "}
                  {project.submitLastDate}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Name:
                  </strong>{" "}
                  {project.teacherName}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">
                    Teacher Email:
                  </strong>{" "}
                  {project.teacherEmail}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => handleModal(project)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "13rem",
                      overflow: "hidden",
                      height: "3rem",
                      backgroundSize: "300% 300%",
                      backdropFilter: "blur(1rem)",
                      borderRadius: "5rem",
                      transition: "0.5s",
                      border: "double 4px transparent",
                      backgroundImage:
                        "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "content-box, border-box",
                      animation: "gradient_301 5s ease infinite",
                    }}
                  >
                    <strong
                      style={{
                        zIndex: 2,
                        fontFamily: "Avalors Personal Use",
                        fontSize: "12px",
                        letterSpacing: "5px",
                        color: "#FFFFFF",
                        textShadow: "0 0 4px white",
                      }}
                    >
                      DETAILS
                    </strong>
                    <div
                      id="container-stars"
                      style={{
                        position: "absolute",
                        zIndex: -1,
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        transition: "0.5s",
                        backdropFilter: "blur(1rem)",
                        borderRadius: "5rem",
                      }}
                    >
                      <div
                        id="stars"
                        style={{
                          position: "relative",
                          background: "transparent",
                          width: "200rem",
                          height: "200rem",
                          animation: "animStarRotate 90s linear infinite",
                        }}
                      ></div>
                    </div>
                    <div
                      id="glow"
                      style={{
                        position: "absolute",
                        display: "flex",
                        width: "12rem",
                      }}
                    >
                      <div
                        className="circle"
                        style={{
                          width: "100%",
                          height: "30px",
                          filter: "blur(2rem)",
                          animation: "pulse_3011 4s infinite",
                          zIndex: -1,
                        }}
                      ></div>
                      <div
                        className="circle"
                        style={{
                          width: "100%",
                          height: "30px",
                          filter: "blur(2rem)",
                          animation: "pulse_3011 4s infinite",
                          zIndex: -1,
                        }}
                      ></div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleSignup(project)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "13rem",
                      overflow: "hidden",
                      height: "3rem",
                      backgroundSize: "300% 300%",
                      backdropFilter: "blur(1rem)",
                      borderRadius: "5rem",
                      transition: "0.5s",
                      border: "double 4px transparent",
                      backgroundImage:
                        "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "content-box, border-box",
                      animation: "gradient_301 5s ease infinite",
                    }}
                  >
                    <strong
                      style={{
                        zIndex: 2,
                        fontFamily: "Avalors Personal Use",
                        fontSize: "12px",
                        letterSpacing: "5px",
                        color: "#FFFFFF",
                        textShadow: "0 0 4px white",
                      }}
                    >
                      APPLY
                    </strong>
                    <div
                      id="container-stars"
                      style={{
                        position: "absolute",
                        zIndex: -1,
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        transition: "0.5s",
                        backdropFilter: "blur(1rem)",
                        borderRadius: "5rem",
                      }}
                    >
                      <div
                        id="stars"
                        style={{
                          position: "relative",
                          background: "transparent",
                          width: "200rem",
                          height: "200rem",
                          animation: "animStarRotate 90s linear infinite",
                        }}
                      ></div>
                    </div>
                    <div
                      id="glow"
                      style={{
                        position: "absolute",
                        display: "flex",
                        width: "12rem",
                      }}
                    >
                      <div
                        className="circle"
                        style={{
                          width: "100%",
                          height: "30px",
                          filter: "blur(2rem)",
                          animation: "pulse_3011 4s infinite",
                          zIndex: -1,
                        }}
                      ></div>
                      <div
                        className="circle"
                        style={{
                          width: "100%",
                          height: "30px",
                          filter: "blur(2rem)",
                          animation: "pulse_3011 4s infinite",
                          zIndex: -1,
                        }}
                      ></div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="student_project"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center justify-center gap-11">
                {selectedProject && (
                  <div
                    key={selectedProject.id}
                    className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 w-96 shadow-md"
                  >
                    <h2 className="text-lg font-semibold mb-2">
                      {selectedProject.project}
                    </h2>
                    <p>
                      <strong className="text-black font-bold">Batch:</strong>{" "}
                      {selectedProject.batch}
                    </p>
                    <p>
                      <strong className="text-black font-bold">Class:</strong>{" "}
                      {selectedProject.grade}
                    </p>
                    <p>
                      <strong className="text-black font-bold">Subject:</strong>{" "}
                      {selectedProject.time}
                    </p>{" "}
                    <p>
                      <strong className="text-black font-bold">Skills:</strong>{" "}
                      {selectedProject?.skills}
                    </p>
                    <p>
                      <strong className="text-black font-bold">Type:</strong>{" "}
                      {selectedProject.type}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Expected Outcome:
                      </strong>{" "}
                      {selectedProject.expectedOutcome}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Last day of Submit:
                      </strong>{" "}
                      {selectedProject.submitLastDate}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Teacher Name:
                      </strong>{" "}
                      {selectedProject.teacherName}
                    </p>{" "}
                    <p>
                      <strong className="text-black font-bold">
                        Teacher Email:
                      </strong>{" "}
                      {selectedProject.teacherEmail}
                    </p>{" "}
                    <p>
                      <strong className="text-black font-bold">
                        Requirement:
                      </strong>{" "}
                      {selectedProject.requirement}
                    </p>
                    <div className="flex items-center justify-center mt-4">
                      <button
                        onClick={() =>
                          document.getElementById("student_project").close()
                        }
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "13rem",
                          overflow: "hidden",
                          height: "3rem",
                          backgroundSize: "300% 300%",
                          backdropFilter: "blur(1rem)",
                          borderRadius: "5rem",
                          transition: "0.5s",
                          border: "double 4px transparent",
                          backgroundImage:
                            "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
                          backgroundOrigin: "border-box",
                          backgroundClip: "content-box, border-box",
                          animation: "gradient_301 5s ease infinite",
                        }}
                      >
                        <strong
                          style={{
                            zIndex: 2,
                            fontFamily: "Avalors Personal Use",
                            fontSize: "12px",
                            letterSpacing: "5px",
                            color: "#FFFFFF",
                            textShadow: "0 0 4px white",
                          }}
                        >
                          Close
                        </strong>
                        <div
                          id="container-stars"
                          style={{
                            position: "absolute",
                            zIndex: -1,
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            transition: "0.5s",
                            backdropFilter: "blur(1rem)",
                            borderRadius: "5rem",
                          }}
                        >
                          <div
                            id="stars"
                            style={{
                              position: "relative",
                              background: "transparent",
                              width: "200rem",
                              height: "200rem",
                              animation: "animStarRotate 90s linear infinite",
                            }}
                          ></div>
                        </div>
                        <div
                          id="glow"
                          style={{
                            position: "absolute",
                            display: "flex",
                            width: "12rem",
                          }}
                        >
                          <div
                            className="circle"
                            style={{
                              width: "100%",
                              height: "30px",
                              filter: "blur(2rem)",
                              animation: "pulse_3011 4s infinite",
                              zIndex: -1,
                            }}
                          ></div>
                          <div
                            className="circle"
                            style={{
                              width: "100%",
                              height: "30px",
                              filter: "blur(2rem)",
                              animation: "pulse_3011 4s infinite",
                              zIndex: -1,
                            }}
                          ></div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleSignup(selectedProject)}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "13rem",
                          overflow: "hidden",
                          height: "3rem",
                          backgroundSize: "300% 300%",
                          backdropFilter: "blur(1rem)",
                          borderRadius: "5rem",
                          transition: "0.5s",
                          border: "double 4px transparent",
                          backgroundImage:
                            "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
                          backgroundOrigin: "border-box",
                          backgroundClip: "content-box, border-box",
                          animation: "gradient_301 5s ease infinite",
                        }}
                      >
                        <strong
                          style={{
                            zIndex: 2,
                            fontFamily: "Avalors Personal Use",
                            fontSize: "12px",
                            letterSpacing: "5px",
                            color: "#FFFFFF",
                            textShadow: "0 0 4px white",
                          }}
                        >
                          APPLY
                        </strong>
                        <div
                          id="container-stars"
                          style={{
                            position: "absolute",
                            zIndex: -1,
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            transition: "0.5s",
                            backdropFilter: "blur(1rem)",
                            borderRadius: "5rem",
                          }}
                        >
                          <div
                            id="stars"
                            style={{
                              position: "relative",
                              background: "transparent",
                              width: "200rem",
                              height: "200rem",
                              animation: "animStarRotate 90s linear infinite",
                            }}
                          ></div>
                        </div>
                        <div
                          id="glow"
                          style={{
                            position: "absolute",
                            display: "flex",
                            width: "12rem",
                          }}
                        >
                          <div
                            className="circle"
                            style={{
                              width: "100%",
                              height: "30px",
                              filter: "blur(2rem)",
                              animation: "pulse_3011 4s infinite",
                              zIndex: -1,
                            }}
                          ></div>
                          <div
                            className="circle"
                            style={{
                              width: "100%",
                              height: "30px",
                              filter: "blur(2rem)",
                              animation: "pulse_3011 4s infinite",
                              zIndex: -1,
                            }}
                          ></div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default StudentProject;
