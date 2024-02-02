"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../../../firebase.config";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schema";
import toast from "react-hot-toast";

interface RegisterValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const initialValues: RegisterValues = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterValues) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // TODO: Check if username exists in firebase db, if it does, RETURN an error

      //user signed up
      const user = userCredential.user;

      // send verified email
      sendEmailVerification(user);

      dispatch({ type: "REGISTER", payload: user });

      toast.success("Success! Email Verification link sent!");

      // A delay of at least 3 seconds using a promise and setTimeout
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push("/");
    } catch (error: any) {
      toast.error(error.code);
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full text-center">
          <div className="w-full space-y-3 p-4 bg-[#161B22]">
            <div>
              <label className="mb-2.5 block font-display text-left font-medium">
                Full name
              </label>
              <Field
                className={`w-full rounded border ${
                  loading ? "cursor-not-allowed:" : "cursor-pointer"
                } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
                placeholder="John Doe"
                type="text"
                disabled={loading}
                name="fullname"
                id="fullname"
              />
              <ErrorMessage
                name="fullname"
                component="p"
                className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red"
              />
            </div>

            <div>
              <label className="mb-2.5 block font-display text-left font-semibold">
                Username
              </label>
              <Field
                className={`w-full rounded border ${
                  loading ? "cursor-not-allowed:" : "cursor-pointer"
                } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
                disabled={loading}
                placeholder="jonnn_"
                type="text"
                name="username"
                id="username"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red"
              />
            </div>

            <div>
              <label className="mb-2.5 block font-display text-left font-semibold">
                Email
              </label>
              <Field
                className={`w-full rounded border ${
                  loading ? "cursor-not-allowed:" : "cursor-pointer"
                } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
                disabled={loading}
                placeholder="example@mail.com"
                type="email"
                name="email"
                id="email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red"
              />
            </div>

            <div>
              <label className="mb-2.5 block font-display text-left font-semibold">
                Password
              </label>
              <Field
                disabled={loading}
                className={`w-full rounded border ${
                  loading ? "cursor-not-allowed:" : "cursor-pointer"
                } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
                placeholder="*****"
                type="password"
                name="password"
                id="password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red"
              />
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className={`bg-secondary-green w-full py-2 rounded font-semibold hover:opacity-70 ${
                  loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
              >
                Sign up
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};
