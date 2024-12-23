import React from "react";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "./sign-in-form";

export default function SignInSection() {
  return (
    <div className="w-full py-6 lg:p-6">
      <div className="flex flex-col gap-10 items-center h-full">
        <Link className="flex gap-2 w-full justify-center lg:justify-start" href="/">
          <div className="flex gap-2 w-full justify-center lg:justify-start">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <h1 className="text-2xl font-bold text-gray-800">HD</h1>
          </div>
        </Link>
        <div className="flex w-full h-full items-center justify-center lg:pl-10">
          <div className="w-full lg:w-[90%] md:max-w-screen-sm flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
              Sign In
            </h2>
            <p className="mt-2 text-sm text-gray-400 text-center lg:text-left">
              Please login to continue to your account.
            </p>
            <SignInForm />
            <p className="mt-10 lg:mt-8 text-center text-gray-500">
              Need an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
