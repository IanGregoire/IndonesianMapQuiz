import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indonesian Province Quiz",
  description: "Learn Indonesia Kabupaten by island!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-between mx-10">
          <h1 className="text-2xl font-bold mb-6"><a href={'/'}>🗺️ Indonesian Province Quiz</a></h1>
          <h1 className="text-2xl font-bold mb-6"><a href={'/history'}>History</a></h1>
        </div>
        {children}
      </body>
    </html>
  );
}
