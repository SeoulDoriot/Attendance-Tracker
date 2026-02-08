export default function Input({
  placeholder,
  type = "text",
  rightIcon,
}: {
  placeholder: string;
  type?: string;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-zinc-200 bg-white px-6 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-[#F2C9A8]"
      />
      {rightIcon && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
}