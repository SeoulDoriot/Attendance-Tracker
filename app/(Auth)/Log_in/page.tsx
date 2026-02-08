import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <div className="mx-auto max-w-[1200px] px-10 py-8">
        {/* Logo */}
        <Image
          src="/kit-logo.png"
          alt="KIT"
          width={80}
          height={80}
          priority
        />

        {/* Main layout */}
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          
          {/* LEFT – Login form */}
          <div className="mx-auto w-full max-w-md">
            <h1 className="text-4xl font-bold text-zinc-900">
              Wellcome Back !!
            </h1>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="mt-10 w-full rounded-full border border-zinc-200 px-6 py-4 text-sm outline-none focus:border-[#F4C9A6]"
            />

            {/* Password */}
            <div className="relative mt-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-full border border-zinc-200 px-6 py-4 text-sm outline-none focus:border-[#F4C9A6]"
              />
            </div>

            {/* Forgot password */}
            <div className="mt-3 text-right text-xs text-zinc-500">
              <Link href="/forgot-password">Forgot Password ?</Link>
            </div>

            {/* Button */}
            <button className="mt-8 w-full rounded-full bg-[#F4C9A6] py-4 text-sm font-semibold text-white">
              Create account
            </button>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4 text-xs text-zinc-400">
              <div className="h-px flex-1 bg-zinc-200" />
              or
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-8">
              <button type="button" aria-label="Continue with Google" className="rounded-full p-2 hover:bg-zinc-100">
                <Image src="/google.png" alt="Google" width={26} height={26} />
              </button>
              <button type="button" aria-label="Continue with Apple" className="rounded-full p-2 hover:bg-zinc-100">
                <Image src="/apple.png" alt="Apple" width={26} height={26} />
              </button>
              <button type="button" aria-label="Continue with KIT" className="rounded-full p-2 hover:bg-zinc-100">
                <Image src="/kit-logo.png" alt="KIT" width={26} height={26} />
              </button>
            </div>

            {/* Sign up */}
            <p className="mt-6 text-center text-xs text-zinc-500">
              Don’t have an account?{" "}
              <Link href="/Sign_up" className="font-semibold text-zinc-900">
                Sign Up
              </Link>
            </p>
          </div>

          {/* RIGHT – Image + circle */}
          <div className="relative hidden lg:flex min-h-[700px] justify-end">
            {/* Big circle background (lower, like your design) */}
            <div className="absolute -right40 -bottom- h-[660px] w-[360px] rounded-full bg-[#F7E7D7]" />

            {/* Student image */}
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