"use client";
import logo from "../../images/healthnut_transparent.png";
import Image from "next/image";
import Link from "next/link";
import "./Header.css";

import React from "react";

export default function Header() {
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
        <Link className="common" href="/">
          About us
        </Link>
        <Link className="begin" href="/">
          Begin
        </Link>
      </div>
    </nav>
  );
}
