import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import LoadingOverlay from "@/components/loading-overlay";
import { LoadingProvider } from "./context/loading-context";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes",
  description: "Get your notes done easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <LoadingProvider>
          <LoadingOverlay />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
