import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const Login = ({setUser}) => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })  
  }
  
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/log-in", {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const json = await res.json();
      if (json.token) {
        // save token in local storage
        localStorage.setItem("token", json.token);
        nav('/');
        setUser(json.body);
      } else {
        setMessage(json.message);
      }

    } catch (err) {
      console.log(err);
    }
  }

  return(
    <div>
      <form id="loginform" onSubmit={formSubmitHandler}>
        <label htmlFor="username">
          <input id="username" 
                  type="text" 
                  required={true} 
                  placeholder="Username"
                  onChange={handleInputChange}>

                  </input>
        </label>
        <label htmlFor="password">
          <input id="password" 
                  type="password" 
                  required={true} 
                  placeholder="Password"
                  onChange={handleInputChange}>
          </input>
        </label>
        <button type="submit">Log in</button>
      </form>
      <div>{message == null ? "" : message}</div>
    </div>
  )
}