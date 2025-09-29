"use client";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Contact = ({ setting }) => {
  return (
    <div className="mx-auto mt-24">
      <div className="flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-3xl max-sm:text-xl text-center px-4 mt-5 font-bold text-gray-800">
          <Typewriter
            words={["✨ ईमानदारी ही खाईवाल BHAI की पहचान है। 😎"]}
            cursor
            cursorBlinking={false}
            cursorStyle=""
            typeSpeed={80}
          />
        </h1>
        <div className="bg-gradient w-full text-center mt-5 py-4  ">
          <h2 className="text-4xl lg:text-5xl text-white font-semibold text-theme-accent">
            T1 Satta 👑
          </h2>
        </div>
        <div className="mx-auto max-w-[300px] mt-5 hover:scale-110 transition-all duration-300">
          <Link
            target="_blank"
            href={`https://wa.me/+${setting?.whatsappNumber}`}
          >
            <Image
              className="max-sm:w-[200px] mx-auto max-sm:h-16"
              width={300}
              height={100}
              src="https://i.ibb.co/4RJCLbSB/whatsapp.png"
              alt="whatsapp"
            />
          </Link>
        </div>
        <div className="mt-5 bg-gradient font-semibold text-2xl max-sm:text-xl py-4 text-center px-3 w-full text-white">
          <span>
            @{new Date().getFullYear()} T1 Satta :: All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
