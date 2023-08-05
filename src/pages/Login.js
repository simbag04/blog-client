import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const Login = ({login}) => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  
  const goHome = () => {
    nav('/');
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })  
  }
  
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(formData);
    const result = await login(formData);
    if (result !== "Login successful") {
      setMessage(result)
    } else {
      nav('/')
    }
  }

  return(
    <div className="content-body login">
      <h1>Login</h1>
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
          <button type="submit">Log in</button>
          <button type="button" onClick={goHome}>Home</button>
        </div>
      </form>
      <div>{message == null ? "" : message}</div>
    </div>
  )
}