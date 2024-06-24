"use client";

import React from "react";
import Header from "./components/Header/header";
import Hero from "./components/Hero/hero";
import { parseClientCookies } from "@/libs/cookies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseClientCookies();
    const medplumAccessToken = cookies.medplumAccessToken;
    const medplumUserInfo = cookies.medplumUserInfo;

    if (medplumAccessToken || medplumUserInfo) {
      router.push("/Dashboard");
    }
  }, [router]);

  return (
    <main className="container">
      <Header />
      <Hero />
    </main>
  );
}
