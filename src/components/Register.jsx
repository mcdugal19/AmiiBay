import React, { useState } from "react";
import { registerUser } from "../axios-services";
import  useAuth  from "../hooks/useAuth";
const Register = () => {
    const { setUser, setIsLoggedIn, isLoggedIn } = useAuth();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmationPassword, setConfirmationPassword ] = useState("");
    const [ passwordError, setPasswordError ] = useState(false);

    return (
        <div className="register-page">
        <h2>Welcome to Amiibos!</h2>
        {/* The form below is the form that verifies login credentials */}
        <div className="form-container">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                  if (password === confirmationPassword){
                    const response = await registerUser(username, password);
                    setUser(response);
                    setIsLoggedIn(true);
                  } else {
                      setPasswordError(true);
                  }
                
              } catch (error) {
                console.error(
                  "There was a problem with your registration information.",
                  error
                );
              }
            }}
          >
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
  
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              value={confirmationPassword}
              placeholder="Password Confirmation"
              onChange={(e) => {
                setConfirmationPassword(e.target.value);
              }}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        {/* the below section only displays after a successful user login */}
        <div
          className="login-confirmation"
          style={{
            display: passwordError ? "block" : "none", 
          }}
        >
          <h3>PASSWORDS DO NOT MATCH!</h3>
        </div>
        <div
          className="login-confirmation"
          style={{
            display: isLoggedIn ? "block" : "none", 
          }}
        >
          <h3>REGISTRATION COMPLETE!</h3>
        </div>  
      </div>
    );
}

export default Register;