import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Tekton Challenge",
  description: "Magic: The Gathering Cards Dashboard",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
