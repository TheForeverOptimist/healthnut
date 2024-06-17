"use client"

import React from "react";
import {useState} from "react"
import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero";

export default function Home() {
  const [page, setPage] = useState<string>('home');
  const [user, setUser] = useState(null)

  // const handleLogin = (userData) => {
  //   setUser(userData)
  //   setPage("dashboard")
  // }

  return (
    <main className="container">
      <Header />
      <Hero />
    </main>
  )
}
