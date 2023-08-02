import { Link, Outlet } from "react-router-dom"

export const Navbar = ({user}) => {
  return (
    <div>
      <Link to="/posts">Posts</Link>
      {user ? "Welcome, " + user.username : 
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}
      <Outlet></Outlet>
    </div>
  )
}