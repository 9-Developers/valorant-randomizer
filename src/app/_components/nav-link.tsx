import Link from "next/link";

export default function NavLink({
  href,
  name,
}: {
  href: string,
  name: string,
}) {
  return (
    <Link className="hover:bg-white/25 leading-8 text-center w-1/2" href={href}>
      {name}
    </Link>
  );
}
