import React from "react";
import { RegisterForm } from "../register/register-form";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#161B22",
            color: "#FFFAFF",
          },
        }}
      />
      <div className="w-full">
        <h1 className="text-sm text-center font-semibold ml-2">
          Create an account with
          <span className="font-accent text-xl"> socialize</span>
        </h1>
      </div>

      <RegisterForm />
      <div>
        <Link href="/login">
          <span className="text-secondary-green font-semibold">
            already have an account? login
          </span>
        </Link>
      </div>
    </>
  );
};

export default page;
