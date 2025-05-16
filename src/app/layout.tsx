import "~/styles/globals.css";

import { type Metadata } from "next";
import type { ReactNode } from "react";
import Header from "~/app/_components/header";

export const metadata: Metadata = {
  title: "Valorant randomizer",
  description: "Randomized agents and weapons for Valorant",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): ReactNode {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Header />
        <main className="flex flex-col items-center justify-center">
          <div className="w-3/4">{children}</div>
        </main>
      </body>
    </html>
  );
}
