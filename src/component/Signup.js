import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Signup(props) {

    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
        });
        const json = await response.json();
        console.log(json);
        localStorage.setItem('token', json.authtoken)
        navigate('/')
        props.showAlert("success", "Accout have created and logged in")

    }

    return (
        <div className='container'>
            <h2 className='my-3'>Create an account to use Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
