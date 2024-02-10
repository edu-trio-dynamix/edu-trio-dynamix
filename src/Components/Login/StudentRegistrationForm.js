import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./TeacherRegistrationForm.css";

const StudentRegistrationForm = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedCommunicationChannel, setSelectedCommunicationChannel] =
    useState([]);
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(null);

  const communicationChannelOptions = [
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Other", value: "other" },
  ];

  const handleCommunicationChannelChange = (selectedOption) => {
    setSelectedCommunicationChannel(selectedOption);
  };

  const handleSubmitForm = async (data) => {
    // Add your form submission logic here
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center bg-gradient-to-r from-neutral to-secondary">
          <div className="w-1/2 bg-white mt-16 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl text-center text-primary font-bold mb-4">
              Student Registration
            </h2>

            <form onSubmit={handleSubmit(handleSubmitForm)}>
              {/* Full Name field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="First Name, Last Name"
                  name="fullName"
                  className="input input-sm input-bordered w-full"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Full Name is required",
                    },
                  })}
                />
                <label>
                  {errors.fullName?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Email field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  className="input input-sm input-bordered w-full"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid email",
                    },
                  })}
                />
                <label>
                  {errors.email?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input input-sm input-bordered w-full"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 characters or longer",
                    },
                  })}
                />
                <label>
                  {errors.password?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Confirm Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="input input-sm input-bordered w-full"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Password confirmation is required",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match", // Check if it matches the "password" field
                  })}
                />
                <label>
                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                  {errors.confirmPassword?.type === "validate" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Date of Birth */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Date of Birth
                  </span>
                </label>
                <DatePicker
                  selected={selectedDateOfBirth}
                  onChange={(date) => setSelectedDateOfBirth(date)}
                  dateFormat="yyyy-MM-dd"
                  className="input input-sm input-bordered w-full"
                  placeholderText="yyyy-MM-dd"
                />
              </div>

              {/* Grade/Year */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Grade/Year
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Grade/Year"
                  name="gradeYear"
                  className="input input-sm input-bordered w-full"
                  {...register("gradeYear")}
                />
              </div>

              {/* School/College/University */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    School/College/University
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="School/College/University"
                  name="institution"
                  className="input input-sm input-bordered w-full"
                  {...register("institution")}
                />
              </div>

              {/* Interests/Hobbies */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Interests/Hobbies
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Interests/Hobbies"
                  name="interestsHobbies"
                  className="input input-sm input-bordered w-full"
                  {...register("interestsHobbies")}
                />
              </div>

              {/* Parent/Guardian Information */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Parent/Guardian Information
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Parent/Guardian Name"
                  name="parentGuardianName"
                  className="input input-sm input-bordered w-full"
                  {...register("parentGuardianName")}
                />
                <input
                  type="email"
                  placeholder="Parent/Guardian Email"
                  name="parentGuardianEmail"
                  className="input input-sm input-bordered w-full mt-2"
                  {...register("parentGuardianEmail")}
                />
                <input
                  type="text"
                  placeholder="Parent/Guardian Phone Number"
                  name="parentGuardianPhoneNumber"
                  className="input input-sm input-bordered w-full mt-2"
                  {...register("parentGuardianPhoneNumber")}
                />
              </div>
              {/* Image upload */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Photo
                  </span>
                </label>
                <input
                  type="file"
                  placeholder="Your image"
                  name="image"
                  className="input input-sm input-bordered w-full"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Image is required",
                    },
                  })}
                />
                <label>
                  {errors.image?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.image.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Preferred Communication Channel */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Preferred Communication Channel
                  </span>
                </label>
                <Select
                  value={selectedCommunicationChannel}
                  options={communicationChannelOptions}
                  onChange={handleCommunicationChannelChange}
                  isSearchable={false}
                  placeholder="Select Communication Channel"
                />
              </div>

              <div className="flex justify-center items-center mt-7">
                <input
                  className="custom-btn text-black"
                  value="REGISTER"
                  type="submit"
                />
              </div>
            </form>
            <p className="text-center">
              <small className="font-semibold">
                Already have an account?{" "}
                <Link className="text-accent" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentRegistrationForm;
