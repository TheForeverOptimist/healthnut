"use client";

import React from "react";
import "./Hero.css";
import doctor from "../../images/doctor_hero.png";
import stetho from "../../images/stetho.png"
import Image from "next/image";

interface HeroProps {
    setPage: (page: string) => void;
}

export default function Hero({setPage}: HeroProps): JSX.Element {
  return (
    <section className="heroSection">
      <div className="heroContent">
        <h1>Post Visit Summaries that Make Sense for Everyone</h1>
        <p>We make sure you have no doubts about the cost of your care!</p>
        <Image className="stethoImage" src={stetho} alt="stethoscope"></Image>
        <button className="start">Let&apos;s get started!</button>
      </div>
      <div className="heroImage">
        <Image src={doctor} alt="Doctor" />
      </div>
    </section>
  );
}
