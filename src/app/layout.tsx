import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./NavBar/NavBar";

export const metadata: Metadata = {
  title: process.env.APP_TITLE,
  description: process.env.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main>
      </body>
    </html>
  );
}
