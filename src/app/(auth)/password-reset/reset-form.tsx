"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase.config";
import toast from "react-hot-toast";
import { passwordResetSchema, TPasswordResetSchema } from "@/src/app/schema";
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

export const ResetForm = () => {
  const router = useRouter();
  const form = useForm<TPasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TPasswordResetSchema) => {
    try {
      setLoading(true);

      sendPasswordResetEmail(auth, data.email)
        .then(() => {
          // Password reset email sent!
          toast.success("Password reset email sent!");
        })
        .catch((error) => {
          toast.error(error.message);
        });

      // A delay of at least 3 seconds using a promise and setTimeout
      await new Promise((resolve) => setTimeout(resolve, 6000));

      setLoading(false);

      router.push("/login");
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
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
