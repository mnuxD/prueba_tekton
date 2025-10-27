import React from "react";
import { PublicLayout } from "@/layouts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
