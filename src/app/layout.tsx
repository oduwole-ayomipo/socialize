import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Socialize",
  description: "Next Gen Space for Virtual Connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
