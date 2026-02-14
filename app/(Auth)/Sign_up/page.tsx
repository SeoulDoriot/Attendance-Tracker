"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Divider from "@/components/auth/Divider";
import SocialIcon from "@/components/auth/Socialicon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10.6 10.6A2 2 0 0012 16a2 2 0 001.4-.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.9 5.1A10.3 10.3 0 0112 4c7 0 10 8 10 8a17 17 0 01-4.2 5.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.1 6.1C3.6 8.2 2 12 2 12s3 8 10 8c1.1 0 2.1-.2 3-.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SignupPage() {
  const [role, setRole] = useState<"student" | "teacher" | "">("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim() || !password || !repeatPassword || !role) {
      return setErrorMsg("Please fill all fields and select a role.");
    }

    if (password !== repeatPassword) {
      return setErrorMsg("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return setErrorMsg((data as any)?.error || "Signup failed.");
      }

      // If you enabled email confirmation in Supabase Auth,
      // the API may return needsEmailConfirmation=true.
      if ((data as any)?.needsEmailConfirmation) {
        return setErrorMsg("Account created. Please check your email to confirm, then login.");
      }

      router.push("/Log_in");
    } catch {
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb] flex items-center">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2 lg:items-center w-full">
        {/* KIT logo top-left */}
        <div className="lg:col-span-2 mb-4">
          <Image src="/kit-logo.png" alt="KIT" width={80} height={80} priority />
        </div>

        {/* Title */}
        <div className="lg:col-span-2 mb-2">
          <h1 className="text-3xl font-semibold text-black">Registration</h1>
        </div>

        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="relative z-20 mt-2 space-y-5">
          <Input
            placeholder="Full name"
            type="text"
            value={fullName}
            onChange={(e: any) => setFullName(e.target.value)}
          />

          {/* Role Selection */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`h-12 w-full rounded-xl border text-sm font-medium transition ${
                role === "student"
                  ? "border-black bg-black text-white"
                  : "border-zinc-300 bg-white text-black"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`h-12 w-full rounded-xl border text-sm font-medium transition ${
                role === "teacher"
                  ? "border-black bg-black text-white"
                  : "border-zinc-300 bg-white text-black"
              }`}
            >
              Teacher
            </button>
          </div>

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            rightIcon={<EyeOffIcon />}
          />

          <Input
            placeholder="Repeat Password"
            type="password"
            value={repeatPassword}
            onChange={(e: any) => setRepeatPassword(e.target.value)}
            rightIcon={<EyeOffIcon />}
          />

          {/* Checkbox row */}
          <label className="flex items-center gap-3 pt-1 text-xs text-zinc-700">
            <input type="checkbox" className="h-4 w-4 accent-black" />
            <span>I accept the terms and privacy policy</span>
          </label>

          {errorMsg ? <div className="text-sm text-red-500">{errorMsg}</div> : null}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>

          <p className="pt-1 text-center text-[11px] text-zinc-500">
            By creating an account or signing you agree to our{" "}
            <span className="font-semibold text-black underline">Terms and Conditions</span>
          </p>

          <Divider />

          <p className="text-center text-[11px] text-zinc-400">Continue with :</p>

          <div className="flex items-center justify-center gap-6">
            <SocialIcon src="/google.png" alt="Google" />
            <SocialIcon src="/apple.png" alt="Apple" />
            <SocialIcon src="/kit-logo.png" alt="KIT" />
          </div>

          <p className="pt-2 text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <Link href="/Log_in" className="font-semibold text-black underline">
              Login
            </Link>
          </p>
        </form>

        {/* Right: Image (cannot block clicks) */}
        <div className="relative hidden lg:flex w-full justify-end items-center pointer-events-none">
          <div className="relative h-[520px] w-[520px]">
            <div className="absolute -right-10 bottom-10 h-[600px] w-[380px] rounded-full bg-[#F7E7D8]" />
            <div className="absolute right-0 top-0" style={{ transform: "translateY(-40px)" }}>
              <Image
                src="/student.png"
                alt="student"
                width={520}
                height={760}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}