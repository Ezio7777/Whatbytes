import Link from "next/link";
import { LogoMark } from "./LogoMark";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Whatbytes Store, go to home page"
      className="group flex items-center gap-2.5 text-white"
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:h-10 sm:w-10" />
      <span className="hidden text-2xl font-bold tracking-tight sm:inline sm:text-[26px] sm:leading-none">
        What<span className="font-medium text-white/85">bytes</span>
      </span>
    </Link>
  );
}
