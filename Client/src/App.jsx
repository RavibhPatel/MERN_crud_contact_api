import React from "react";
import Login from "./components/login/Login";
import Contact from "./components/contact/Contact";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RegisterUser from "./components/Register/RegisterUser";
import Logout from "./components/Logout/Logout";

const App = () => {
  return (
    <div className="my-5">
      <Router>
        <Routes>
                {/* <Route path="/" element={<Login></Login>} />
                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute>
                      <Contact />
                    </ProtectedRoute>
                  }
                /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } 
          />
          <Route path="/register" element={<RegisterUser/>} />
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
