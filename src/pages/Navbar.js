import { Link, Outlet } from "react-router-dom"
import '../styles/navbar.css'

export const Navbar = ({user}) => {
  return (
    <>
      <span id="navbar">
        <h1>Blog</h1>
        <div className="links">
          {user ? 
            <>
              <span className="welcome">Welcome {user.username}</span>
              <Link to="/logout">Logout</Link>
            </> :
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>}
        </div>
        
      </span>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </>
  )
}