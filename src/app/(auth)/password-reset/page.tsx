import React from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { Cormorant_Unicase } from "next/font/google";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ResetForm } from "./reset-form";

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
          <span className="text-sm pt-2 text-center">
            Forgot your password? Enter the email address and we will send a
            link to reset your password.
          </span>
        </CardHeader>
        <CardContent className="w-full">
          <ResetForm />
        </CardContent>
        <CardFooter className="pb-2">
          <Link href="/login">
            <span className="text-sm text-accent-green p-1 hover:font-semibold">
              Back to Login
            </span>
          </Link>
        </CardFooter>
      </>
    </>
  );
};

export default page;
