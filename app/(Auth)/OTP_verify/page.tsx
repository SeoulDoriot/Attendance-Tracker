"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabaseClient";

export default function OTPVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Auto submit when 6 digits filled
  useEffect(() => {
    const finalOtp = otp.join("");
    if (finalOtp.length === 6 && !loading) {
      handleVerify();
    }
  }, [otp]);

  async function handleVerify() {
    if (!email) return setError("Email missing.");

    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return;

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: finalOtp,
      type: "email",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/Welcome_page");
    }
  }

  async function handleResend() {
    if (!email) return setError("Email missing.");
    if (cooldown > 0) return;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    if (error) {
      setError(error.message);
    } else {
      setError("New code sent to your email.");
      setOtp(Array(6).fill(""));
      setCooldown(30); // 30 second timer
    }
  }

  return (
    <div className="relative min-h-screen bg-[#f8f8f8] overflow-hidden animate-fadeIn">

      {/* Blurred background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[420px] bg-white rounded-3xl shadow-xl p-10 space-y-6 blur-sm opacity-70">
          <h2 className="text-2xl font-semibold text-black text-center">
            Create Account
          </h2>
          <input className="w-full h-12 rounded-xl border px-4" />
          <input className="w-full h-12 rounded-xl border px-4" />
          <input className="w-full h-12 rounded-xl border px-4" />
          <button className="w-full h-12 bg-black text-white rounded-xl">
            Create Account
          </button>
        </div>
      </div>

      {/* Glass OTP Card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative backdrop-blur-3xl bg-white/30 border border-white/40 shadow-[0_30px_100px_rgba(0,0,0,0.15)] rounded-3xl p-12 w-[450px] text-center transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

          <h1 className="text-3xl font-semibold text-gray-900">
            Email Verification
          </h1>

          <p className="text-sm text-gray-600 mt-3 mb-10">
            Enter the 6-digit code sent to your email
          </p>

          <div className="flex justify-center gap-4 mb-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  const newOtp = [...otp];
                  newOtp[index] = value;
                  setOtp(newOtp);

                  if (value && index < 5) {
                    document.getElementById(`otp-${index + 1}`)?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    document.getElementById(`otp-${index - 1}`)?.focus();
                  }
                }}
                className="w-14 h-14 text-center text-xl font-semibold bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-6">{error}</p>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-2xl font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>

          <p className="text-xs text-gray-500 mt-8">
            Didn’t receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={cooldown > 0}
              className="underline font-medium disabled:opacity-40"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}