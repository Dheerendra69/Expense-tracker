import React, { useState } from "react";
import API from "../api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: res.data.username,
          email: res.data.email,
        })
      );

      window.location.href = "/home";
    } catch (error) {
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const signupData = {
        username: decoded.name,
        email: decoded.email,
        password: "google-oauth",
      };

      const res = await API.post("/saveUser", signupData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: res.data.username,
          email: res.data.email,
        })
      );

      window.location.href = "/home";
    } catch (error) {
      alert(
        "Google SignUp failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <hr />
      <h3>Or login with Google</h3>
      <div className="google-login-button">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => alert("Google Login Failed")}
        />
      </div>

      <div className="signup-redirect">
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/signup")} className="signup-btn">
          Go to Signup
        </button>
      </div>
    </div>
  );
}

export default Login;
