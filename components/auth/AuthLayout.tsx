import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center gap-10 px-6">
        {/* LEFT */}
        <div className="w-full max-w-xl">{children}</div>

        {/* RIGHT IMAGE */}
        <div className="hidden w-full items-center justify-end md:flex">
          <div className="relative h-[520px] w-[520px]">
            <div className="absolute inset-0 rounded-full bg-[#F7E7D8]" />
            <Image
              src="/student.png"
              alt="student"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}