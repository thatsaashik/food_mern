import React from "react";
import { Home } from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import { Cartprovider } from "./Components/ContextReducer";
import MyOrder from "./Pages/MyOrder";

const App = () => {
  return (
    <>
      <Cartprovider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/MyOrder" element={<MyOrder />} />
        </Routes>
      
      </Cartprovider>
    
    </>
  );
};

export default App;
