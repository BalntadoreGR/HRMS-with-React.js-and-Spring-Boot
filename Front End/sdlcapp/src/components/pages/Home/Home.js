
import React, { useState, useCallback, useEffect } from "react";
import './../../pages/Home/Home.css';
import { Fragment } from "react";
import Login from "./Login/Login";

const Home = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee");
  
    return (
      <div className="home">
          <Login/>
      </div>
    );
};

export default Home;