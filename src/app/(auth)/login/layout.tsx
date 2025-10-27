import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Tekton Challenge",
  description: "Inicia sesión en Tekton Challenge",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
