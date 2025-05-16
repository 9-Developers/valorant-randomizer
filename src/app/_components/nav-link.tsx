import Link from "next/link";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  name,
}: {
  href: string,
  name: string,
}): ReactNode {
  return (
    <Link className="hover:bg-white/25 leading-8 text-center w-1/2" href={href}>
      {name}
    </Link>
  );
}
