"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthContext } from "../../context/AuthContext";
import { auth, db } from "../../../firebase.config";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schema";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ClipLoader } from "react-spinners";

interface RegisterValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const initialValues: RegisterValues = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterValues) => {
    try {
      //Check if username exists in firebase db, if it does, RETURN an error
      const q = query(
        collection(db, "userProfile"),
        where("username", "==", values.username)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        return toast.error("Oops! Username already exists");
      }

      // If username does not occur, proceed to account creation
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      //user signed up
      const user = userCredential.user;

      // send verified email
      await sendEmailVerification(user);

      // dispatch the registered state
      dispatch({ type: "REGISTER", payload: user });

      toast.success("Success! Email Verification link sent!");

      //set a timer delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // set user profile data to firestore db
      await setDoc(doc(db, "userProfile", user.uid), {
        email: values.email,
        fullname: values.fullname,
        username: values.username,
        bio: " ",
      });

      //Navigate to home page
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
              <label className="mb-2.5 block font-display text-left font-medium">
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
                className={`w-full bg-secondary-green py-2 rounded font-semibold  ${
                  loading
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer hover:opacity-70"
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
                  {" Sign Up"}
                </>
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};
