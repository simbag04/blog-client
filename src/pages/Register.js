import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../App";

export const Register = () => {
  const nav = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const apiLink = useContext(ApiContext)

  const goHome = () => {
    nav('/')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })  
  }
  
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiLink}/sign-up`, {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const json = await res.json();
      if (!json.success) {
        setMessage(json.message);
      } else {
        setRegistered(true);
      }

    } catch (err) {
    }
  }

  return(
    <div className="content-body register">
      <h1>Register</h1>
      {registered ? null : 
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
          <div className="horizontal-buttons">
            <button type="submit">Register</button>
            <button type="button" onClick={goHome}>Home</button>
          </div>
        </form>
      }
      <div>
        {registered ? 
          <div>
            Registration successful! 
            <Link to="/login">Login</Link>
          </div> :     
          message == null ? "" : 
            message.map((mess, index) => {
              return <div key={index}>{mess.msg === undefined ? mess : mess.msg}</div>
            })}
      </div>
    </div>
  )
}