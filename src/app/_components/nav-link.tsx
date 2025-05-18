import Link from "next/link";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  name,
}: {
  href: string;
  name: string;
}): ReactNode {
  return (
    <Link className="w-1/2 text-center leading-8 hover:bg-white/25" href={href}>
      {name}
    </Link>
  );
}
