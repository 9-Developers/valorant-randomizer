import Link from "next/link";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  text,
}: {
  href: string;
  text: string;
}): ReactNode {
  return (
    <Link className="w-1/2 text-center leading-8 hover:bg-white/25" href={href}>
      {text}
    </Link>
  );
}
