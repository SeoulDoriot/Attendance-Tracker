"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      return setErrorMsg("Please fill all fields.");
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return setErrorMsg(data.error || "Login failed.");
    }

    if (data.role === "teacher") {
      router.push("/Teacher");
    } else {
      router.push("/Student");
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <div className="mx-auto max-w-[1200px] px-0 py-8">
        <Image
          src="/kit-logo.png"
          alt="KIT"
          width={80}
          height={80}
          priority
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">

          <div className="mx-auto w-full max-w-md">
            <h1 className="text-4xl font-bold text-zinc-900">
              Welcome Back !!
            </h1>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-10 w-full rounded-full border border-zinc-200 text-zinc-900 px-6 py-4 text-sm outline-none focus:border-[#F4C9A6]"
              />

              <div className="relative mt-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-zinc-200 px-6 text-zinc-900 py-4 text-sm outline-none focus:border-[#F4C9A6]"
                />
              </div>

              <div className="mt-3 text-right text-xs text-zinc-500">
                <Link href="/forgot-password">Forgot Password ?</Link>
              </div>

              {errorMsg && (
                <p className="mt-4 text-sm text-red-500">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#F4C9A6] py-4 text-sm font-semibold text-white"
              >
                Log in
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 text-xs text-zinc-400">
              <div className="h-px flex-1 bg-zinc-200" />
              or
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <div className="flex items-center justify-center gap-8">
              <button type="button" className="rounded-full p-2 hover:bg-zinc-100">
                <Image src="/google.png" alt="Google" width={26} height={26} />
              </button>
              <button type="button" className="rounded-full p-2 hover:bg-zinc-100">
                <Image src="/apple.png" alt="Apple" width={26} height={26} />
              </button>
              <button type="button" className="rounded-full p-2 hover:bg-zinc-100">
                <Image src="/kit-logo.png" alt="KIT" width={26} height={26} />
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-zinc-500">
              Don’t have an account?{" "}
              <Link href="/Sign_up" className="font-semibold text-zinc-900">
                Sign Up
              </Link>
            </p>
          </div>

        
          <div className="relative hidden lg:flex min-h-[700px] justify-end">
            {/* Big circle background (lower, like your design) */}
            <div className="absolute -right40 -bottom- h-[660px] w-[360px] rounded-full bg-[#F7E7D7]" />

            <Image
              src="/student.png"
              alt="Student"
              width={520}
              height={760}
              className="relative z-10 object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}