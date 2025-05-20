import Link from "next/link";
import type { ReactNode } from "react";

export default function Header(): ReactNode {
  return (
    <header>
      <Link href="/">
        <h1 className="leading-snug">Valorant Randomizer</h1>
      </Link>
      <nav>
        <Link className="nav-link" href="/agent">
          Agent
        </Link>
        <Link className="nav-link" href="/weapon">
          Weapon
        </Link>
        <Link className="nav-link" href="/settings">
          Settings
        </Link>
      </nav>
    </header>
  );
}
