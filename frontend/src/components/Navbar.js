import React from 'react'
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href='#'>iNoteBook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-outline-primary mx-2" role="button" to='/login'>Login</Link>
                        <Link className="btn btn-outline-primary mx-2" role="button" to='/signup'>SignUp</Link>
                    </form> : <button className="btn btn-outline-primary mx-2" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>

    )
}

export default Navbar
