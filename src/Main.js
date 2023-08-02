import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom"
import { Posts } from "./Posts"
import { Login } from "./Login";
import { Register } from "./Register";
import { Navbar } from "./Navbar";

export function Main () {

  const [user, setUser] = useState(null);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar user={user}></Navbar>}>
          <Route path="/posts" element={<Posts user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
    </HashRouter>
  )
}