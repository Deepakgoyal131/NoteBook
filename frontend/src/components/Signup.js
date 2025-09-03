import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  // ye nhi karenge to page ho jaye ga Reload

    if(!credentials.name || !credentials.email || !credentials.password || !credentials.cpassword){
      props.showAlert("Please fill in all fields", 'danger');
      return;
    }
    // API call
    try {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
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
        navigate('/');
        props.showAlert("Account Created SuccessFully", 'sucsses')
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" >SignUP</button>
      </form>
    </div>
  )
}

export default Signup
