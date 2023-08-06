import React, { useEffect, useState, useContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom"
import { Posts } from "./pages/Posts"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./pages//Navbar";
import { Logout } from "./pages/Logout";
import './styles/index.css'
import { ApiContext } from "./App";
import { SinglePost } from "./pages/SinglePost";
import { UserPosts } from "./pages/UserPosts";
import { AddPost } from "./pages/AddPost";
import { EditPost } from "./pages/EditPost";
import { DeletePost } from "./pages/DeletePost";


export function Main () {
  const [user, setUser] = useState(null);
  const apiLink = useContext(ApiContext);
  const login = async (data) => {
    try {
      const res = await fetch(`${apiLink}/log-in`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const json = await res.json();
      if (json.token) {
        // save token in local storage
        localStorage.setItem("token", json.token);
        
        localStorage.setItem("user", JSON.stringify(json.body));
        setUser(json.body);
      }
      return json.message;

    } catch (err) {
      console.log(err);
    }
  }

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]))
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        const decodedJwt = parseJwt(token);
        if (decodedJwt.exp * 1000 < Date.now()) {
          localStorage.setItem("token", null);
          localStorage.setItem("user", null);
        } else {
          setUser(user);
        }
      }
    }

    const attemptLogin = async () => {
      await verifyAuth();
    }

    attemptLogin().catch(console.error);
  }, [])
  
  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<Navbar user={user}></Navbar>}>
            <Route index 
              element={<Posts user={user} setUser={setUser}/>} />
            <Route path="/post/:pid" 
              element={<SinglePost user={user} setUser={setUser}/>} />
            <Route path="/user/posts" element={<UserPosts user={user}/>}></Route>
            <Route path="/add" element={<AddPost user={user}/>} />
            <Route path="/edit/:pid" element={<EditPost user={user}/>} />
            <Route path="/delete/:pid" element={<DeletePost user={user}/>} />
            <Route path="/login" element={<Login login={login}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout setUser={setUser}></Logout>}></Route>
          </Route>
        </Routes>
    </HashRouter>
  )
}