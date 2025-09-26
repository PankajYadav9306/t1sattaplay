import Image from "next/image";
import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto px-3 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gradient2 px-3 items-center justify-center h-full min-h-56 flex flex-col gap-4">
          <h2 className="text-white text-3xl md:text-4xl">Contact Us</h2>
          <p className="text-base text-center text-white">
            For any enquiry message us at{" "}
            <Link
              className="text-white font-semibold"
              href="Contact@B1satta.In"
            >
              Contact@B1satta.In
            </Link>
          </p>
        </div>
        <div>
          <Image
            src="https://i.ibb.co/93nZ3LWy/Yellow-Minimalist-Contact-Us-Instagram-Post-2.png"
            alt="contact img"
            className="max-md:mt-[-50px] max-sm:mt-0 w-full"
            width={300}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
