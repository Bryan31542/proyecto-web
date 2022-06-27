import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../Pages/Login";

const AuthRouter = ({setToken, setType}) => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login setToken={setToken} setType={ setType}/>} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AuthRouter;
