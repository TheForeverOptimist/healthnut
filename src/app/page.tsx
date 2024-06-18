"use client"

import React from "react";
import {useState} from "react"
import Header from "./components/Header/page"
import Hero from "./components/Hero/page";
import { useSession } from "next-auth/react";
import Dashboard from "./components/Dashboard/page";
import Login from "./components/Login/page";

export default function Home(): JSX.Element {
  const [page, setPage] = useState<string>('home');
  const {data: session, status} = useSession()

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
        <Dashboard user={session.user} />
      ) : (
        <>
        {page === "home" && <Hero setPage={setPage} />}
        {page === 'begin' && <Login />}
        </>
      )}
    </main>
  );
}
