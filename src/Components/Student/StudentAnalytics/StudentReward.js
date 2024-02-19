import React, { useState, useEffect } from "react";
import StudentLeaderboard from "./StudentLeaderboard";

const StudentReward = () => {
  const [rewards, setRewards] = useState([]);
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});

  useEffect(() => {
    if (userRole === "student" && userEmail) {
      fetch(
        `https://edu-trio-dynamix-server.onrender.com/student?email=${userEmail}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === userEmail
            );
            if (matchingUser) {
              setLoggedStudent(matchingUser);
              fetch(
                `https://edu-trio-dynamix-server.onrender.com/student/rewards?studentEmail=${userEmail}`
              )
                .then((response) => response.json())
                .then((data) => {
                  const studentRewards = data.filter(
                    (reward) => reward.studentEmail === matchingUser.email
                  );
                  setRewards(studentRewards);
                })
                .catch((error) => {
                  console.error("Error fetching rewards:", error);
                });
            }
          }
        });
    }
  }, [userRole, userEmail]);

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 lg:flex">
      <div className="lg:w-1/2 lg:pt-28 p-8">
        <div>
          <div className="card-body">
            <h2 className="text-center text-2xl text-primary font-extrabold mb-4">
              Your Rewards
            </h2>
            {rewards.map((reward) => (
              <div
                key={reward._id}
                className="bg-white shadow-md p-4 rounded-md mb-4"
              >
                <h2 className="text-lg text-md font-bold text-blue-700">
                  {reward.rewardTitle}
                </h2>
                <p className="text-gray-600 mt-2">
                  <span className="text-md font-bold text-blue-700">
                    Student:
                  </span>{" "}
                  {reward.studentName}
                </p>
                <p className="text-gray-600">
                  <span className="text-md font-bold text-blue-700">
                    Teacher:
                  </span>{" "}
                  {reward.teacherEmail}
                </p>
                <p className="text-gray-600">
                  <span className="text-md font-bold text-blue-700">
                    Description:
                  </span>{" "}
                  {reward.description}
                </p>
                <p className="text-gray-600">
                  <span className="text-md font-bold text-blue-700">
                    Points:
                  </span>{" "}
                  {reward.points}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      <div className="lg:w-1/2">
        <StudentLeaderboard />{" "}
      </div>
    </div>
  );
};

export default StudentReward;
