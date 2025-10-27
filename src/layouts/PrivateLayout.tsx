"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { Spinner, Button } from "@/components/common";
import Image from "next/image";

interface PrivateLayoutProps {
  children: ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <nav className="bg-white shadow-md border-b border-gray-200 flex-shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-md md:text-3xl text-tekton flex items-center gap-2 md:gap-5">
                <Image
                  src="/tekton.svg"
                  alt="Tekton Challenge"
                  className="w-20 h-3 md:w-40 md:h-6"
                  width={158}
                  height={25}
                />
                CHALLENGE
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>

              <Button variant="danger" onClick={logout} className="text-sm">
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-6 h-full">{children}</div>
      </main>

      <footer className="bg-white border-t border-gray-200 flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-600">
            © 2025 Tekton Challenge - Prueba Técnica
          </p>
        </div>
      </footer>
    </div>
  );
};
