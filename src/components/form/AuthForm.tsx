"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Input from "./Input";
import Link from "next/link";
import { getFormSchema } from "./utils";
import { useCallback } from "react";

export default function AuthForm({ type }: AuthFormProps) {
  const formSchema = useCallback(() => {
    return getFormSchema(type);
  }, [type]);

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema()),
    defaultValues:
      type === "sign-in"
        ? {
            email: "",
            password: "",
          }
        : {
            username: "",
            email: "",
            password: "",
          },
  });

  function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-sm:p-2"
      >
        <h2 className="text-3xl font-medium mt-8 text-center">
          {type === "sign-in" ? "Sign in to Telegram" : "Sign up to Telegram"}
        </h2>

        <p className="text-faded-gray mt-4 text-[16px] text-center">
          {type === "sign-up"
            ? "Please enter your email and password to continue using the telegram web clone"
            : "Hello 👋, Let's sign you up. please enter your credentials below."}
        </p>

        {type === "sign-up" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="username"
                    className="tg-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="tg-error-message" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email"
                  className="tg-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="tg-error-message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  className="tg-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="tg-error-message" />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className={`w-full p-3 dark:bg-secondary-dark bg-secondary-light text-primary-light font-medium rounded-xl mt-4 text-lg  flex justify-center gap-4 items-center hover:bg-opacity-80 `}
        >
          Next
        </button>

        <p className="text-center mt-3 text-faded-gray">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}
          &nbsp;
          <Link
            className="dark:text-secondary-dark cursor-pointer text-secondary-light hover:opacity-75"
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
    </Form>
  );
}
