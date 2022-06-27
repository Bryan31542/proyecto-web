import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../Pages/Main";
import CreatePost from "../Pages/CreatePost";
import Favorites from "../Pages/Favorites";
import MyPost from "../Pages/MyPost";

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Main />} />
            <Route path="/create_post" element={<CreatePost />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/my_post" element={<MyPost />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
    
export default AdminRouter;