import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [selectedRoute, setSelectedRoute] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  return (
    <nav className="bg-gradient-to-r from-accent via-secondary to-accent text-white font-bold p-4">
      <div className="container mx-auto flex justify-center items-center">
        {!userRole && (
          <Link to="/" className="text-4xl">
            EduTrio Dynamix
          </Link>
        )}
      </div>

      {/* Navigation links  */}
      {userRole && (
        <div className="container mx-auto flex justify-center items-center">
          {/* Dropdown Menu for Small Screens */}
          <div className="lg:hidden relative">
            <button
              onClick={toggleDropdown}
              className="text-xl focus:outline-none"
            >
              &#9776;
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-base-100 rounded shadow-lg">
                <ul className="py-2 px-4"></ul>
              </div>
            )}
          </div>

          <div>
            {/* Create a dropdown for small and medium screens */}
            <div className="dropdown dropdown-end md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full"></div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                {/* Navigation links for small */}
                {userRole === "teacher" && (
                  <>
                    <li>
                      <Link
                        to="/teacherProfile"
                        className={`text-lg font-bold hover:text-accent ${
                          selectedRoute === "/teacherProfile"
                            ? "text-yellow-400"
                            : "text-white"
                        }`}
                        onClick={() => handleRouteClick("/teacherProfile")}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherCourse"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Course
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherProject"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Project
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherAssignment"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Assignment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherResource"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Resource
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherAnalytics"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Analytics
                      </Link>
                    </li>
                  </>
                )}
                {userRole === "student" && (
                  <>
                    <li>
                      <Link
                        to="/studentProfile"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentCourse"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Course
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentProject"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Project
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentAssignment"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Assignment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentResource"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Resource
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentAnalytics"
                        className="text-white text-lg font-bold hover:text-accent"
                      >
                        Analytics
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/logout"
                    className="text-red font-bold hover:text-white"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>

            {/* Centered Menu for Large Screens */}
            <ul className="hidden lg:flex space-x-8">
              {/* Navigation links */}
              <li>
                <Link
                  style={{ fontFamily: "cursive" }}
                  className="text-green-200 text-lg font-bold hover:text-accent"
                  to="/"
                >
                  EdiTrio-Dynamix
                </Link>
              </li>
              {userRole === "teacher" && (
                <>
                  <li>
                    <Link
                      to="/teacherProfile"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/teacherProfile"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/teacherProfile")}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherCourse"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/teacherCourse"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/teacherCourse")}
                    >
                      Course
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherProject"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/teacherProject"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/teacherProject")}
                    >
                      Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherViewProject"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/teacherViewProject"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/teacherViewProject")}
                    >
                      View-Submission
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherResource"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/teacherResource"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/teacherResource")}
                    >
                      Resource
                    </Link>
                  </li>
                </>
              )}
              {userRole === "student" && (
                <>
                  <li>
                    <Link
                      to="/studentProfile"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/studentProfile"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentProfile")}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentCourse"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/studentCourse"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentCourse")}
                    >
                      Course
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentProject"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/studentProject"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentProject")}
                    >
                      Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentAssignment"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/studentAssignment"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentAssignment")}
                    >
                      Assignment
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      to="/studentCollaboration"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/studentCollaboration"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentCollaboration")}
                    >
                      Collaborate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/chat"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/chat"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/chat")}
                    >
                      Chat
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/codeEditor"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/codeEditor"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentCollaboration")}
                    >
                      Code-Editor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentResource"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/studentResource"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentResource")}
                    >
                      Resource
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentAnalytics"
                      className={`text-lg font-bold hover:text-accent ${
                        selectedRoute === "/studentAnalytics"
                          ? "text-yellow-200"
                          : "text-white"
                      }`}
                      onClick={() => handleRouteClick("/studentAnalytics")}
                    >
                      Analytics
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={logout}
                  className="text-red-600 text-lg font-bold hover:text-accent"
                >
                  Logout
                </button>
              </li>{" "}
              <li className="text-white text-xs font-semibold hover:text-accent justify-end">
                {userEmail}
                <br />
                {userRole}
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
