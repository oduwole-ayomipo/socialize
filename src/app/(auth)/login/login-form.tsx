"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";
import toast from "react-hot-toast";
import { loginSchema, TLoginSchema } from "@/src/app/schema";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const onSubmit = async (data: TLoginSchema) => {
    try {
      setLoading(true);

      // user logged in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential;

      dispatch({ type: "LOGIN", payload: user });

      toast.success("Success! Redirecting");

      // A delay of at least 3 seconds using a promise and setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLoading(false);

      reset();

      router.push("/");
    } catch (error: any) {
      toast.error(error.code);
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 p-4 bg-[#161B22]"
      >
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
      </form>
    </>
  );
};
