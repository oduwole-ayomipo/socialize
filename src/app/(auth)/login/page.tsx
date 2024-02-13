import React from "react";
import Link from "next/link";
import { LoginForm } from "../login/login-form";
import { Toaster } from "react-hot-toast";
import { Cormorant_Unicase } from "next/font/google";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const cormorant = Cormorant_Unicase({ weight: ["700"], subsets: ["latin"] });

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
      <>
        <CardHeader className="pt-2">
          <h1 className={`text-3xl text-center ${cormorant.className}`}>
            socialize
          </h1>
        </CardHeader>
        <CardContent className="w-full">
          <LoginForm />
        </CardContent>
        <CardFooter className="pb-2">
          <Link href="/register">
            <span className="text-sm text-accent-green font-semibold p-1 hover:font-bold">
              new to socialize? create an account
            </span>
          </Link>
        </CardFooter>
      </>
    </>
  );
};

export default page;
