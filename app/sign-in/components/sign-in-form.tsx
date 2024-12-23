"use client";
import { useLoading } from "@/app/context/loading-context";
import { sendOTP, verifySignIn } from "@/app/utils/helpers";
import { Eye, EyeOff, OctagonAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const { setLoading } = useLoading();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setSubmitted(true);
    setWarning(null);
    setDisabled(true);
    if (!formData.email || !formData.otp) {
      setWarning("Email & OTP are required");
      setDisabled(false);
      setLoading(false);
      return;
    }
    verifySignIn(formData.email, formData.otp).then((res) => {
      if (res.success) {
        setLoading(false);
        router.push("/notes");
      } else {
        setLoading(false);
        alert(res.error);
      }
    });
  };

  const handleOTP = () => {
    setWarning(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setWarning("Invalid email");
      setDisabled(false);
      return;
    }
    setDisabled(true);
    sendOTP(formData.email).then((res) => {
      if (res.success) {
        setWarning("OTP sent successfully");
      } else {
        setWarning(res.error);
        setDisabled(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
            submitted && !formData.email && "border-red-500"
          }`}
          placeholder=""
          required
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Email
        </label>
      </div>

      {/* OTP Field */}
      <div className="flex items-center w-full gap-3">
        <div className="relative w-full">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                submitted && !formData.otp && "border-red-500"
              }`}
              placeholder=""
            />
            <label
              htmlFor="otp"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              OTP
            </label>
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye className={`w-5 h-5 ${showPassword ? "hidden" : "block"}`} />
              <EyeOff
                className={`w-5 h-5 ${showPassword ? "block" : "hidden"}`}
              />
            </button>
          </div>
        </div>
        <div>
          <button
            className={`px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 w-28 h-full ${
              !formData.email ? "cursor-not-allowed" : ""
            }${disabled ? "cursor-not-allowed bg-gray-400" : ""}`}
            onClick={handleOTP}
            disabled={!formData.email || disabled}
          >
            Send OTP
          </button>
        </div>
      </div>

      {/* Forgot Password Link */}
      <div>
        <Link href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Keep me logged in Checkbox */}
      <div className="flex items-center justify-between">
        <label htmlFor="remember" className="text-sm text-gray-800">
          <input type="checkbox" id="remember" className="mr-2" />
          Keep me logged in
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Sign in
      </button>

      <div
        className={`flex gap-1 transition-all duration-300 ${
          warning ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <OctagonAlert className={`w-5 h-5  ${warning?.includes("successfully") ? "text-blue-500" : " text-red-500"}`} />
        <div className={` text-sm ${warning?.includes("successfully") ? "text-blue-500" : " text-red-500"}`} >{warning}</div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center space-x-2">
        <hr className="w-1/2 border-gray-300" />
        <span className="text-gray-500">or</span>
        <hr className="w-1/2 border-gray-300" />
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        className="flex items-center font-semibold justify-center w-full px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
      >
        Sign in with Google
        <Image
          src="/google.svg"
          alt="Google"
          className="w-5 h-5 ml-2"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
}
