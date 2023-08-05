import { useNavigate } from "react-router-dom"
import '../styles/logout.css'

export const Logout = ({setUser}) => {
  const nav = useNavigate();
  const goHomeHandler = () => {
    nav('/');
  }

  const logoutHandler = () => {
    setUser(null);
    localStorage.setItem("user", null);
    localStorage.setItem("token", null);
    nav('/')
  }

  return (
    <div className="content-body">
      <h1>Logout</h1>
      <div className="logout-text">Are you sure you want to log out?</div>
      <div className="horizontal-buttons">
        <button onClick={goHomeHandler}>Home</button>
        <button onClick={logoutHandler}>Yes</button>
      </div>
    </div>
  )
}