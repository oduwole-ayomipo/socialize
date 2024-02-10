"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthContext } from "../../context/AuthContext";
import { auth, db } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { registerSchema, TRegisterSchema } from "@/src/app/schema";
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

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      //Check if username exists in firebase db, if it does, RETURN an error
      const q = query(
        collection(db, "userProfile"),
        where("username", "==", data.username)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        return toast.error("Oops! Username already exists");
      }

      // If username does not occur, proceed to account creation
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
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
        email: data.email,
        fullname: data.fullname,
        username: data.username,
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full text-center">
        <div className="w-full space-y-3 p-4 bg-[#161B22]">
          <div>
            <label className="mb-2.5 block font-display text-left font-medium">
              Full name
            </label>
            <input
              {...register("fullname")}
              className={`w-full rounded border ${
                loading ? "cursor-not-allowed:" : "cursor-pointer"
              } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
              placeholder="John Doe"
              type="text"
              disabled={loading}
              id="fullname"
            />
            {errors.fullname && (
              <p className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red">{`${errors.fullname.message}`}</p>
            )}
          </div>

          <div>
            <label className="mb-2.5 block font-display text-left font-medium">
              Username
            </label>
            <input
              {...register("username")}
              className={`w-full rounded border ${
                loading ? "cursor-not-allowed:" : "cursor-pointer"
              } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
              disabled={loading}
              placeholder="jonnn_"
              type="text"
              name="username"
              id="username"
            />
            {errors.username && (
              <p className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red">{`${errors.username.message}`}</p>
            )}
          </div>

          <div>
            <label className="mb-2.5 block font-display text-left font-medium">
              Email
            </label>
            <input
              {...register("email")}
              className={`w-full rounded border ${
                loading ? "cursor-not-allowed:" : "cursor-pointer"
              } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
              disabled={loading}
              placeholder="example@mail.com"
              type="email"
              name="email"
              id="email"
            />
            {errors.email && (
              <p className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red">{`${errors.email.message}`}</p>
            )}
          </div>

          <div>
            <label className="mb-2.5 block font-display text-left font-medium">
              Password
            </label>
            <input
              {...register("password")}
              disabled={loading}
              className={`w-full rounded border ${
                loading ? "cursor-not-allowed:" : "cursor-pointer"
              } border-secondary-green/40 bg-primary-black py-2 px-3 shadow-1 focus:border-secondary-green focus:outline-none focus-visible:shadow-none`}
              placeholder="*****"
              type="password"
              name="password"
              id="password"
            />

            {errors.password && (
              <p className="mb-2.5 block font-display text-left font-normal my-[2px] text-xs text-secondary-red">{`${errors.password.message}`}</p>
            )}
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
      </form>
    </>
  );
};
