import React, { useState } from "react";
import "./loginform.css";
import { useRouter } from "next/navigation";
import { medplum } from "@/libs/medplumClient";

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const loginResponse = await medplum.startLogin({
        email,
        password,
      });

      if (loginResponse.code) {
        router.push(`/api/auth/callback`);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid email or password");
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
