"use client"

import React, { useState } from "react";
import './invite.css'
import Header from "../components/Header/header";

const Invite = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.message === "Practitioner created!") {
        console.log('add router')
      }
      // alert('Invitation Complete!')
      // setPage('verify')
    } else {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        alert(`Error: ${errorData.message}`);
      } catch (e) {
        alert(`Error: ${errorText}`);
      }
    }
  };
  return (
    <>
    <Header />
    <section className="inviteSection">
      <form className="inviteForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </section>
    </>
  );
};

export default Invite;
