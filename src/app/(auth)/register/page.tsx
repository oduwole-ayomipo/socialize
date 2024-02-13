import React from "react";
import { RegisterForm } from "../register/register-form";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Cormorant_Unicase } from "next/font/google";

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
          <h3 className="text-center text-sm md:text-base">
            create an account and stay connected!
          </h3>
        </CardHeader>
        <CardContent className="w-full">
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <Link href="/login">
            <span className="text-sm text-accent-green font-semibold p-1 hover:font-bold">
              already have an account? login{" "}
            </span>
          </Link>
        </CardFooter>
      </>
    </>
  );
};

export default page;
