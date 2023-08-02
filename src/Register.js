import { useState } from "react";
import { Link } from "react-router-dom"

export const Register = () => {
  const [registered, setRegistered] = useState(false);
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
      const res = await fetch("http://localhost:5000/sign-up", {
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
    <div>
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
          <button type="submit">Register</button>
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