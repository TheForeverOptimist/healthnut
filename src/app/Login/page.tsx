"use client"
import React from "react";
import Header from "../components/Header/header";
import LoginForm from "../components/LoginForm/loginform";

export default function Login(): JSX.Element {
  return (
    <main className="container">
      <Header />
      <LoginForm />
    </main>
  );
}
