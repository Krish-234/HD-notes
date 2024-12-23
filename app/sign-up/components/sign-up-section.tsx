import React from "react";
import SignUpForm from "./sign-up-form";
import Image from "next/image";
import Link from "next/link";

export default function SignUpSection() {
  return (
    <div className="w-full py-6 lg:p-6">
      <div className="flex flex-col gap-10 items-center h-full">
        <Link href="/">
          <div className="flex gap-2 w-full justify-center lg:justify-start">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <h1 className="text-2xl font-bold text-gray-800">HD</h1>
          </div>
        </Link>
        <div className="flex w-full h-full items-center justify-center lg:pl-10">
          <div className="w-full lg:w-[90%] md:max-w-screen-sm flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
              Sign Up
            </h2>
            <p className="mt-2 text-sm text-gray-400 text-center lg:text-left">
              Sign up to enjoy the features of HD
            </p>
            <SignUpForm />
            <p className="mt-8 lg:mt-4 text-center text-gray-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
