import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // ye nhi karenge to page ho jaye ga Reload

        if(!credentials.email || !credentials.password){
            props.showAlert("Please fill in all fields", 'danger');
            return;
        }
        // API call
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            // console.log(json);


            if (json.success) {
                //redirect
                localStorage.setItem('token', json.authToken);
                navigate('/');
                props.showAlert("Logined SuccessFully", 'sucsses')
                // console.log(json.authToken)

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
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Signin
