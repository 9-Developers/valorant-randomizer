import Link from "next/link";
import type { ReactNode } from "react";
import NavLink from "./nav-link";

export default function Header(): ReactNode {
  return (
    <header className="h-32 justify-center bg-black">
      <Link href="/">
        <h1 className="mb-0 h-24 text-center leading-snug">
          Valorant Randomizer
        </h1>
      </Link>
      <nav className="mx-[12.5%] flex h-8 w-3/4 justify-between font-semibold">
        <NavLink href="/agent" text="Agent" />
        <NavLink href="/weapon" text="Weapon" />
      </nav>
    </header>
  );
}
