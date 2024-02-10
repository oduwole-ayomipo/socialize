"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";
import toast from "react-hot-toast";
import { loginSchema } from "@/schema";
import { ClipLoader } from "react-spinners";

interface LoginValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      setLoading(true);

      // user logged in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential;

      dispatch({ type: "LOGIN", payload: user });

      toast.success("Success! Redirecting");

      // A delay of at least 3 seconds using a promise and setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        className="w-full text-center space-y-4"
      >
        <Form className="w-full space-y-4 p-4 bg-[#161B22]">
          <div>
            <label className="mb-2.5 block font-display text-left font-medium">
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
            <label className="mb-2.5 block font-display text-left font-medium">
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
              className={`w-full bg-secondary-green py-2 rounded font-semibold hover:opacity-70 ${
                loading ? "cursor-not-allowed opacity-40" : "cursor-pointer"
              }`}
            >
              <>
                <ClipLoader
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  color="#36d7b7"
                  loading={loading}
                  cssOverride={{ margin: "0px 0.5rem -4px 0" }}
                  size={20}
                />
                {" Log In"}
              </>
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
