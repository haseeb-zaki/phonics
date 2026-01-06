import type { Metadata } from "next";
import { Geist, Geist_Mono, Comic_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Phonics Learning - Learn Phonics for Kids and Adults",
  description: "Interactive phonics learning app for kids and adults. Practice spelling, pronunciation, and phonics with voice playback, progress tracking, and adaptive learning.",
  keywords: ["phonics", "learning", "spelling", "pronunciation", "kids education", "adults learning", "English learning"],
  authors: [{ name: "Phonics Learning" }],
  openGraph: {
    title: "Phonics Learning - Learn Phonics for Kids and Adults",
    description: "Interactive phonics learning app with voice playback and progress tracking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comicNeue.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
