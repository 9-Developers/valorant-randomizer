import Link from "next/link";
import type { ReactNode } from "react";
import NavLink from "./nav-link";

export default function Header(): ReactNode {
  return (
    <header className="bg-black h-32 justify-center">
      <Link href="/">
        <h1 className="h-24 leading-snug mb-0 text-center text-white">
          Valorant Randomizer
        </h1>
      </Link>
      <nav className="flex font-semibold h-8 justify-between mx-[12.5%] w-3/4">
        <NavLink href="/agent" name="Agent" />
        <NavLink href="/weapon" name="Weapon" />
      </nav>
    </header>
  );
}
