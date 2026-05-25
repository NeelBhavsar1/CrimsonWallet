import { Geist, Geist_Mono } from "next/font/google";
import {Inter } from "next/font/google";
import "./globals.css";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "CrimsonWallet | Real-Time Crypto Portfolio Tracker",
  description: "CrimsonWallet is a real-time crypto portfolio tracker that provides users with up-to-date information on their cryptocurrency holdings. With support for multiple exchanges and wallets, CrimsonWallet offers a comprehensive view of your crypto assets, allowing you to monitor your portfolio's performance and make informed decisions. Stay on top of the crypto market with CrimsonWallet's intuitive interface and powerful features.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}'}`}>
      <body>{children}</body>
    </html>
  );
}
