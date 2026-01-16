import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    rollNo: "",
    courseOrSubject: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      rollNo: formData.rollNo,
      role,
      course: formData.courseOrSubject, // ✅ FIX HERE
    };

    try {
      await axios.post("http://localhost:5000/api/users/create", payload);
      alert("User Created Successfully");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="border-2 px-4 w-1/2 rounded-md m-10">
      <h1 className="text-xl font-medium mb-4">Create a User</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className="p-1 block"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          className="p-1 block"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          className="p-1 block"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        <label htmlFor="rollNo">Roll No</label>
        <input
          className="p-1 block"
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
        />

        <label className="mt-2 block">Role</label>

        <input
          type="radio"
          name="role"
          checked={role === "teacher"}
          onChange={() => setRole("teacher")}
        />
        <label className="ml-1">Teacher</label>

        <input
          type="radio"
          name="role"
          checked={role === "student"}
          onChange={() => setRole("student")}
          className="ml-4"
        />
        <label className="ml-1">Student</label>

        <br />

        {role === "student" ? (
          <>
            <label>Course</label>
            <select
              className="p-1 block"
              name="courseOrSubject"
              value={formData.courseOrSubject}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="B-tech">B-tech</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="M-tech">M-tech</option>
            </select>
          </>
        ) : (
          <>
            <label>Subject</label>
            <select
              className="p-1 block"
              name="courseOrSubject"
              value={formData.courseOrSubject}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              <option value="DSA">DSA</option>
              <option value="JAVA">JAVA</option>
              <option value="Python">Python</option>
            </select>
          </>
        )}

        <button
          type="submit"
          className="bg-green-500 mt-4 px-3 py-1 text-white rounded hover:bg-green-700"
        >
          Add {role === "student" ? "Student" : "Teacher"}
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
