import React from "react";
import { Link, Navigate } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav bg-green-500 text-white">
      <ul className="flex list-none justify-around ">
        <li
          className="font-bold  hover:text-green-900 cursor-pointer"
          onClick={() => Navigate("/")}
        >
          SDE
        </li>
        <li className="  hover:text-green-900 cursor-pointer">
          <Link to="/createUser" onClick={() => Navigate("/createUser")}>
            CreateUser
          </Link>
        </li>
        <li className="  hover:text-green-900 cursor-pointer">
          <Link to="/allusers" onClick={() => Navigate("/allusers")}>
            AllUser
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
