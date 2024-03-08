"use client";

import axios from "axios";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
    },
  });

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

      //set user profile to postgres db
      if (user) {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/user-profile",
            {
              id: user.uid,
              email_verified: user.emailVerified,
              email: user.email,
              username: data.username,
            }
          );

          console.log(res.data);
        } catch (error) {
          console.error("error creating user", error);
        }
      }

      // dispatch the registered state
      dispatch({ type: "REGISTER", payload: user });

      toast.success("Success! Email Verification link sent!");

      //set a timer delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //Navigate to home page
      router.push("/");
    } catch (error: any) {
      toast.error(error.code);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 p-4 bg-accent-black"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jon Doe"
                  {...field}
                  disabled={loading}
                  className={loading ? "cursor-not-allowed:" : "cursor-pointer"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="johnnn_"
                  {...field}
                  disabled={loading}
                  className={loading ? "cursor-not-allowed:" : "cursor-pointer"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@mail.com"
                  {...field}
                  disabled={loading}
                  className={loading ? "cursor-not-allowed:" : "cursor-pointer"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*****"
                  {...field}
                  disabled={loading}
                  className={loading ? "cursor-not-allowed:" : "cursor-pointer"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button
            type="submit"
            disabled={loading}
            className={` ${
              loading
                ? "cursor-not-allowed opacity-40 hover:opacity-70"
                : "cursor-pointer"
            }`}
          >
            <ClipLoader
              aria-label="Loading Spinner"
              data-testid="loader"
              color="#36d7b7"
              loading={loading}
              cssOverride={{ margin: "0px 0.5rem -4px 0" }}
              size={20}
            />
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};
