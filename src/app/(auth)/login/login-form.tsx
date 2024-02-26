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

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
        className="space-y-4 p-4 bg-accent-black"
      >
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
                  type="password"
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
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};
