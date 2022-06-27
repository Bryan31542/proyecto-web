import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../Pages/Main";
import Favorites from "../Pages/Favorites";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Main />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default UserRouter;
