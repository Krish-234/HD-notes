import Image from "next/image";
import SignInSection from "./components/sign-in-section";

const SignUp = () => {
  return (
    <div className="w-full h-screen">
      <div className=" w-full h-full rounded-xl">
        <div className="flex justify-center w-full h-full gap-5">
          <div className="flex w-[90%] lg:min-w-[35%] justify-center ">
            <SignInSection />
          </div>
          <div className="hidden lg:block lg:min-w-[60%] m-2">
            <Image
              src="/image.png"
              alt="Background"
              className="object-cover w-full h-full rounded-2xl brightness-75"
              width={1000}
              height={700}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
