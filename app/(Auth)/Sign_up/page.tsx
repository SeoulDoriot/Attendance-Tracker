import Image from "next/image";
import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import Divider from "@/components/auth/Divider";
import SocialIcon from "@/components/auth/Socialicon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.6 10.6A2 2 0 0012 16a2 2 0 001.4-.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9.9 5.1A10.3 10.3 0 0112 4c7 0 10 8 10 8a17 17 0 01-4.2 5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.1 6.1C3.6 8.2 2 12 2 12s3 8 10 8c1.1 0 2.1-.2 3-.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function SignupPage() {
  return (
    <AuthLayout>
      {/* KIT logo top-left */}
      <div className="mb-10">
        <Image src="/kit-logo.png" alt="KIT" width={60} height={60} priority />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-semibold text-black">Registeration</h1>

      {/* Form */}
      <div className="mt-8 space-y-5">
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" rightIcon={<EyeOffIcon />} />
        <Input placeholder="Repeat Password" type="password" rightIcon={<EyeOffIcon />} />

        {/* Checkbox row */}
        <label className="flex items-center gap-3 pt-1 text-xs text-zinc-700">
          <input
            type="checkbox"
            className="h-4 w-4 accent-black"
            defaultChecked
          />
          <span>I accept the terms and privacy policy</span>
        </label>

        <Button type="submit">Create account</Button>

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

        <p className="pt-4 text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href="/Log_in" className="font-semibold text-black underline">
            Login
          </Link>
        </p>
      </div>
        <div className="absolute -right40 -bottom- h-[660px] w-[360px] rounded-full bg-[#F7E7D7]" />
    </AuthLayout>
  );
}