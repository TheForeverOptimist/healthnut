"use client";

import React from "react";
import "./Hero.css";
import doctor from "../../images/doctor_hero.png";
import stetho from "../../images/stetho.png"
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Hero(): JSX.Element {
  const router = useRouter();
  const handleInviteClick = () => {
    router.push('/Invite')
  }
  return (
    <section className="heroSection">
      <div className="heroContent">
        <h1>Streamline Post-Visits, Amplify Patient Care</h1>
        <p>Reclaim your time. Enhance your EHR experience.</p>
        <Image className="stethoImage" src={stetho} alt="stethoscope"></Image>
        <button onClick={handleInviteClick} className="start">Let&apos;s get started!</button>
      </div>
      <div className="heroImage">
        <Image src={doctor} alt="Doctor" />
      </div>
    </section>
  );
}
