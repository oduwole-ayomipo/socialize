import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

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
      <body className={`${nunito.className} w-full max-w-6xl mx-auto `}>
        <div className="relative scroll-smooth scroll-m-0">
          <Header />
          {/* childer start */}
          <AuthContextProvider>{children}</AuthContextProvider>
          {/* childer end */}
          <div className="flex items-center w-full justify-center">
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
