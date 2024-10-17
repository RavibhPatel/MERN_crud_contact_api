import React ,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Clear any user authentication data (e.g., token, session)
        localStorage.removeItem("authToken");
    
        // Redirect the user to the login page
        navigate("/login");
      }, [navigate]);
  return (
    <div>
        <h2 className='text-light'>Logging out...</h2>
    </div>
  )
}

export default Logout