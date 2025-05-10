import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
//import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
  {/* <Route path="/resetpassword" element={<ResetPassword />}></Route> */}
    </Routes>
  );
}

export default AllRoutes;