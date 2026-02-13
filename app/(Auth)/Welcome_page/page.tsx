import Image from "next/image";
import Link from "next/link";

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="w-[220px] rounded-2xl border border-zinc-200 bg-white px-4 py-4 shadow-sm">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-zinc-400">{desc}</p>
    </div>
  );
}

function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5.5C4 4.12 5.12 3 6.5 3H20v16H6.5C5.12 19 4 17.88 4 16.5V5.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 19v2H7a3 3 0 0 1-3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconReport() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3h10l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17 3v5h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 13h8M8 17h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <div className="mx-auto  px-21 py-8">
        {/* Top logo */}
        <div className="flex items-start">
          <Image
            src="/kit-logo.png"
            alt="KIT"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* Main layout */}
        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left side */}
          <div className="w-full max-w-xl">
            <h1 className="text-[56px] leading-[1.05] font-normal text-zinc-900">
              Attendance Tracking
              <br />
              <span className="font-semibold text-[#2F52FF]">
                based on location
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-zinc-500">
              Automatically track student attendance when they arrive at class.
              No manual check-ins required.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-10">
              <Link
                href="/Sign_up"
                className="inline-flex h-12 w-36 items-center justify-center rounded-2xl bg-[#F4C9A6] text-sm font-semibold text-white shadow-sm"
              >
                Get Start
              </Link>

              <Link
                href="/Log_in"
                className="inline-flex h-12 w-36 items-center justify-center rounded-2xl border border-zinc-900 bg-white text-sm font-semibold text-zinc-900"
              >
                Sign in
              </Link>
            </div>

            {/* Feature cards */}
            <div className="mt-10 grid grid-cols-1 gap-50 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Join new class"
                desc="Students check in automatically when they enter the class boundary"
                icon={<IconBook />}
              />
              <FeatureCard
                title="Real-Time Tracking"
                desc="View attendance records in real-time with precise timestamps"
                icon={<IconClock />}
              />
              <FeatureCard
                title="Easy Reports"
                desc="Export attendance data to CSV for record-keeping and analysis"
                icon={<IconReport />}
              />
            </div>
          </div>

          {/* Right side (image + circle bg) */}
          <div className="relative hidden lg:flex min-h-[700px] justify-end">
            {/* Big circle background */}
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
