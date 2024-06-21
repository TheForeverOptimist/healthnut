import React, { useState } from "react";
import './loginform.css'


const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log('need to add route')
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Error Logging in:", err);
    }
  }

  return (
    <section className="loginSection">
      <form className="loginForm" onSubmit={handleSubmit}>
        
          <label> Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        
        
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
       
        {error && <p>{error}</p>}
        <button type="submit">Login!</button>
      </form>
    </section>
  );
};

export default LoginForm;
