"use client";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider
            refetchInterval={5 * 60}
            refetchOnWindowFocus={false}
          >
            {children}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
