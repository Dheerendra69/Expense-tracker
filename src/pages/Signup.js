import React, { useState } from "react";
import API from "../api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles/Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/signup", { username, email, password });

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
        "Signup failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleGoogleSignupSuccess = async (credentialResponse) => {
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
        "Google Signup failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Signup</button>
      </form>

      <hr />
      <h3 class="text-center">Or signup with Google</h3>
      <div className="google-login-button">
        <GoogleLogin
          onSuccess={handleGoogleSignupSuccess}
          onError={() => alert("Google Signup Failed")}
        />
      </div>
    </div>
  );
}

export default Signup;
