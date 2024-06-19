"use client";

import React from "react";
import { useState } from "react";
import Header from "./components/Header/header";
import Hero from "./components/Hero/page";
import { useSession } from "next-auth/react";
import Dashboard from "./components/Dashboard/dashboard";
import Invite from "./components/Invite/invite";
import Login from "./components/Login/login";
import FindPatient from "./components/FindPatient/findpatient";

export default function Home(): JSX.Element {
  const [page, setPage] = useState<string>("home");
  const { data: session, status } = useSession();

  // const handleLogin = (userData) => {
  //   setUser(userData)
  //   setPage("dashboard")
  // }

  return (
    <main className="container">
      <Header setPage={setPage} user={session?.user} />
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <Dashboard user={setUser} />
      ) : (
        <>
          
          {page === "home" && <Hero setPage={setPage} />}
          {page === "begin" && <FindPatient setPage={setPage} />}
          {page === "dashboard" && <Dashboard />}
        </>
      )}
    </main>
  );
}
