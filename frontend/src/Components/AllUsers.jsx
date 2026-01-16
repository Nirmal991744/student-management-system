import React, { useEffect, useState } from "react";
import profileImg from "./profile.png";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getUser() {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <h2>Loading------</h2>;
  if (users.length === 0) return <h2>There does not exist any user...</h2>;
  return (
    <div className="flex flex-wrap">
      {users.map((user) => {
        return (
          <div className="relative m-1 rounded bg-neutral-primary-soft max-w-xs w-full p-6 border border-default rounded-base shadow-xs">
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 mb-6 rounded-full"
                src={profileImg}
                alt="profile image"
              />
              <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">
                {user.name}
              </h5>
              <span className="text-sm text-body">{user.email}</span>
              <h3>{user.role}</h3>
              <h2>{user.course}</h2>
              <h1>{user.rollNo}</h1>
              <div className="flex mt-4 md:mt-6 gap-4">
                <button
                  type="button"
                  className="inline-flex cursor-pointer hover:bg-red-600 items-center bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer hover:bg-green-600  self-start w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                >
                  <Link
                    to={`/update/${user._id}`}
                    onClick={() => Navigate("/update")}
                  >
                    Update
                  </Link>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllUsers;
