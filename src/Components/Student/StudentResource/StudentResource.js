import React, { useState, useEffect } from "react";

const StudentResource = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resources from the server
    fetch("http://localhost:5000/teacher/resource")
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <h1 className="text-2xl font-bold text-center uppercase text-white mb-10 pt-10">
        Available Resources
      </h1>
      <div className="flex flex-wrap justify-center">
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="bg-gradient-to-b from-teal-50 to-slate-300 border-gray-300 rounded-lg p-4 m-6 w-1/3 shadow-md"
          >
            <h2 className="text-lg font-semibold mb-2">{resource.title}</h2>
            <p>
              <span className="text-md font-bold text-green-800">
                Teacher Name:
              </span>
              {resource.teacherName}
            </p>
            <p className="text-accent font-bold">
              <span className="text-accent font-bold">Grade:</span>
              {resource.grade}
            </p>
            <p>
              <span className="text-md font-bold text-green-800">Subject:</span>
              {resource.subject}
            </p>
            <p className="mb-5">
              <span className="text-md font-bold text-green-800">
                Teacher Email:
              </span>
              {resource.teacherEmail}
            </p>
            <iframe
              width="100%"
              height="315"
              src={resource.url}
              title={resource.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentResource;
