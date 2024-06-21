"use client";

import React from "react";
import { useState } from "react";
import Header from "./components/Header/header";
import Hero from "./components/Hero/hero";
import Dashboard from "./components/Dashboard/dashboard";
import Invite from "./Invite/page";
import LoginForm from "./components/LoginForm/loginform";

export default function Home(): JSX.Element {

  return (
    <main className="container">
      <Header />
      <Hero />
    </main>
  );
}
