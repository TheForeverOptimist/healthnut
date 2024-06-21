"use client";
import logo from "../../images/healthnut_transparent.png";
import Image from "next/image";
import Link from "next/link";
import "./Header.css";
import { useRouter } from "next/navigation";

import React from "react";

export default function Header(): JSX.Element {
  const router = useRouter();
  const handleInviteClick = () => {
    router.push("/Invite");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Image className="logo" src={logo} alt="Healthnut Logo"></Image>
        <h3 className="logoText">Healthnut</h3>
      </div>
      <div className="navbar-right">
        <Link className="common" href="/">
          Home
        </Link>
        <Link href="/Login" className="common">
          Login
        </Link>
        <button className="begin" onClick={handleInviteClick}>
          Begin
        </button>
      </div>
    </nav>
  );
}
