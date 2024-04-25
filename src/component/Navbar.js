import React from 'react'
import { NavLink ,Link, useNavigate} from 'react-router-dom';

export default function Navbar(props) {

  let navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert("warning","User logged out")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">iNotebook</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>

            </ul>
            {(!localStorage.getItem('token'))?<form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
            </form>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}
