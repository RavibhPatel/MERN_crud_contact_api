import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterUser = () => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:2000/user/create', {name, email, password});
            if(response.data.success){
                setSuccess(true);
                setName('');
                setEmail('');
                setPassword('');
                navigate('/login');
            }else{
                setError("Email already exists.");
                setName('');
                setEmail('');
                setPassword('');
            }
        }catch (err){
            setSuccess(false);
            setError("Failed to register. Please try again.");
        }
    }

  return (
    <div className='container'>
        <div className="row justify-content-center gy-5">
            <div className='col-12'>
                <h2 className='mb-0 text-light text-center'>Register User</h2>
            </div>
            <div className="col-lg-8">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Registration successful!</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Email address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputName" 
                            aria-describedby="emailHelp" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default RegisterUser