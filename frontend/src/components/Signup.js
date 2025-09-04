import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  const host = process.env.REACT_APP_API_HOST;
  const handleSubmit = async (e) => {
    e.preventDefault();  // ye nhi karenge to page ho jaye ga Reload

    if(!credentials.name || !credentials.email || !credentials.password || !credentials.cpassword){
      props.showAlert("Please fill in all fields", 'danger');
      return;
    }
    if(credentials.password !== credentials.cpassword){
      props.showAlert("Passwords do not match", 'danger');
      return;
    }

    // API call
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      // console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        //redirect      
        navigate('/user');
        props.showAlert("Account Created SuccessFully", 'success')
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
        <h2>Create Account</h2>
        <p>Start your journey with iNoteBook</p>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name='name' 
            placeholder="Enter your full name"
            onChange={onChange} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name='email' 
            placeholder="Enter your email"
            onChange={onChange} 
            required
          />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name='password' 
            placeholder="Create a strong password"
            onChange={onChange} 
            minLength={5} 
            required 
          />
          <div className="password-requirements">
            <ul>
              <li>✓ Minimum 5 characters long</li>
              <li>✓ Use a mix of letters, numbers, and symbols</li>
            </ul>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input 
            type="password" 
            id="cpassword" 
            name="cpassword" 
            placeholder="Confirm your password"
            onChange={onChange} 
            required
          />
        </div>
        <button type="submit" className="auth-button">Create Free Account</button>
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
