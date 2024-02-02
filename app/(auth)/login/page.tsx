import React from "react";
import Link from "next/link";
import { LoginForm } from "../login/login-form";

const page = () => {
  return (
    <>
      <>
        <div className="w-full">
          <h1 className="text-sm text-center font-semibold ml-2">
            Login to
            <span className="font-accent text-xl"> socialize</span>
          </h1>
        </div>
        <LoginForm />
        <div>
          <Link href="/register">
            <span className="text-secondary-green font-semibold">
              new to socialize? create an account
            </span>
          </Link>
        </div>
      </>
    </>
  );
};

export default page;
