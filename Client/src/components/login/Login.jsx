import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:2000/user/login', {email, password});
            console.log(response.data);
            if(response.data){
                localStorage.setItem('token', response.data.token);
                navigate('/contact');
            }else{
                setError("Invalid email or password");
                setEmail('');
                setPassword('');
            }
        }catch (err){
            setError(err.message);
        }
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-6">

            </div>    
            <div className="col-md-6">
            {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="mt-3">
                    <p className=" text-light">
                        Don't have an account? <Link to={'/register'}> Register</Link>
                    </p>
                </div>
            </div>
        </div>        
    </div>
    
  )
}

export default Login