import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import AuthRouter from "./Routes/AuthRouter";
import AdminRouter from "./Routes/AdminRouter";
import UserRouter from "./Routes/UserRouter";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [type, setType] = useState(localStorage.getItem("type") || null);

  return (
    <HashRouter>
      {type === "admin" && <AdminRouter />}
      {type === "user" && <UserRouter />}
      {!token && <AuthRouter setToken={setToken} setType={setType} />}
    </HashRouter>
  );
};

export default App;
