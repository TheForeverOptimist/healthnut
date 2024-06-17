"use client";

import React from "react";
import "./Hero.css";
import doctor from "../../images/doctor_hero.png";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="heroSection">
      <div className="heroContent">
        <h1>Post Visit Summaries that Make Sense for Everyone</h1>
        <p>We make sure you have no doubts about the cost of your care!</p>
        <button className="start">Let&apos;s get started!</button>
      </div>
      <div className="heroImage">
        <Image src={doctor} alt="Doctor" />
      </div>
    </section>
  );
}
