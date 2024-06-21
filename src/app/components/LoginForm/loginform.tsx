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

      console.log(loginResponse)

      if (loginResponse.memberships && loginResponse.memberships.length > 0) {
        const primaryMembership = loginResponse.memberships[0];
        document.cookie = `medplumProfile=${encodeURIComponent(
          JSON.stringify(primaryMembership.profile)
        )}; max-age=${30 * 24 * 60 * 60}; path=/; secure; samesite=strict`;
      } else {
        document.cookie = `medplumLogin=${encodeURIComponent(
          loginResponse.login
        )}; max-age=${30 * 24 * 60 * 60}; path=/; secure; samesite=strict`;
      }
      const encodedEmail = encodeURIComponent(email)
      router.push(`/Dashboard?email=${encodedEmail}`);
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
