
"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    try {
      const { data: resData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Sign up failed!");
        return;
      }

      toast.success("Account created successfully!");
      console.log(resData, error);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d19] px-4 py-12">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-[100px]" />
      <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl lg:grid-cols-2">
        {/* Left design panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-[#65101b] p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-20 top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-8 top-40 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-black text-red-700">
                N
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-wide">
                  BANGLA NEWS 24
                </h2>
                <p className="text-xs tracking-[0.2em] text-red-100">
                  YOUR WORLD. YOUR NEWS.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 my-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              Stay informed, stay ahead
            </div>

            <h1 className="max-w-md text-5xl font-black leading-tight xl:text-6xl">
              Your story
              <br />
              starts <span className="text-red-200">here.</span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-8 text-red-100">
              Create your account and stay connected with the stories,
              people, and events that matter to you.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-700 bg-amber-200 font-bold text-gray-900">
                  N
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-700 bg-sky-200 font-bold text-gray-900">
                  R
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-700 bg-emerald-200 font-bold text-gray-900">
                  A
                </div>
              </div>
              <p className="text-sm text-red-100">Join the community</p>
            </div>
          </div>

          <p className="relative z-10 text-xs text-red-200">
            © 2026 Bangla News 24. All rights reserved.
          </p>
        </section>

        {/* Signup form */}
        <section className="p-6 sm:p-10 lg:p-12 xl:p-14">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 font-black text-white">
                N
              </div>
              <span className="font-extrabold tracking-wide text-white">
                BANGLA NEWS 24
              </span>
            </div>
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              SIGN UP
            </span>
          </div>

          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Get started today
            </p>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Create account
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              Fill in your details to get started with us.
            </p>
          </div>

          <Form onSubmit={onSubmit} className="flex flex-col gap-5">
            <TextField name="name" isRequired>
              <Label className="mb-2 block text-sm font-semibold text-gray-200">
                Full name
              </Label>
              <Input
                placeholder="e.g. Atik Hassan"
                autoComplete="name"
                className="w-full rounded-xl border border-white/10 bg-[#1b2434] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-red-500"
              />
              <FieldError className="mt-1 text-sm text-red-400" />
            </TextField>

            <TextField name="email" type="email" isRequired>
              <Label className="mb-2 block text-sm font-semibold text-gray-200">
                Email address
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-[#1b2434] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-red-500"
              />
              <Description className="mt-2 text-xs text-gray-500">
                We will use your email to identify your account.
              </Description>
              <FieldError className="mt-1 text-sm text-red-400" />
            </TextField>

            <TextField name="password" type="password" isRequired>
              <Label className="mb-2 block text-sm font-semibold text-gray-200">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/10 bg-[#1b2434] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-red-500"
              />
              <Description className="mt-2 text-xs text-gray-500">
                Choose a password that is difficult to guess.
              </Description>
              <FieldError className="mt-1 text-sm text-red-400" />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create my account"}
              {!loading && <span className="ml-2 text-lg">→</span>}
            </Button>
          </Form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-500">
              ALREADY A MEMBER?
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-bold text-red-400 transition hover:text-red-300"
            >
              Sign in
            </Link>
            
          </p>

          <p className="mt-8 text-center text-xs leading-6 text-gray-500">
            By creating an account, you agree to our Terms of Service
            and Privacy Policy.
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;
