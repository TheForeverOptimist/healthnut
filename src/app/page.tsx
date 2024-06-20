"use client";

import React from "react";
import { useState } from "react";
import Header from "./components/Header/header";
import Hero from "./components/Hero/page";
import Dashboard from "./components/Dashboard/dashboard";
import Invite from "./components/Invite/invite";

export default function Home(): JSX.Element {
  const [page, setPage] = useState<string>("home");


  return (
    <main className="container">
      <Header setPage={setPage}/>
          {page === "home" && <Hero setPage={setPage} />}
          {page === "begin" &&  <Invite setPage={setPage} />}
          {page === "dashboard" && <Dashboard />}
    </main>
  );
}
