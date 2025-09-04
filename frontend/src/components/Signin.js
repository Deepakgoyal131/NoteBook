import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
     
function Signin(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const host = process.env.REACT_APP_API_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();  // ye nhi karenge to page ho jaye ga Reload

        if(!credentials.email || !credentials.password){
            props.showAlert("Please fill in all fields", 'danger');
            return;
        }
        // API call
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();

            
            if (json.success) {
                //redirect      
                localStorage.setItem('token', json.authToken);
                navigate('/user');
                props.showAlert("Logined SuccessFully", 'sucsses')
                
            }    
            else {
                props.showAlert(json.error, 'danger')
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            props.showAlert("Something went wrong! Try again later", 'danger');
              
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="auth-container">
            <div className="auth-header">
                <h2>Welcome Back</h2>
                <p>Sign in to continue to iNoteBook</p>
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email"
                        onChange={onChange} 
                        value={credentials.email} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"
                        value={credentials.password} 
                        onChange={onChange} 
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Sign In</button>
                <div className="auth-link">
                    New to iNoteBook? <Link to="/signup">Create an account</Link>
                </div>
            </form>
        </div>
    )
}

export default Signin
