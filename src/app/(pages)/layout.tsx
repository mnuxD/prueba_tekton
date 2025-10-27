import React from "react";
import { PrivateLayout } from "@/layouts";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
