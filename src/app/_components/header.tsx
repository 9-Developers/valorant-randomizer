import NavLink from "./nav-link";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black h-32 justify-center text-white">
      <h1 className="font-bold h-24 leading-snug mb-0 text-center text-white text-7xl">
        <Link  href="/">Valorant Randomizer</Link>
      </h1>
      <nav className="flex font-semibold h-8 justify-between mx-[12.5%] w-3/4">
        <NavLink href="/agent" name="Agent" />
        <NavLink href="/weapon" name="Weapon" />
      </nav>
    </header>
  );
}
