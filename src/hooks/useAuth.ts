import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { queryClient } from "@/lib/queryClient";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  const login = async (email: string, password: string) => {
    setIsLoggingIn(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { error: result.error };
      }

      return result;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    queryClient.clear();
    await signOut({ redirect: false });
    router.push("/login");
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return {
    isAuthenticated,
    isLoading,
    isLoggingIn,
    user,
    login,
    logout,
  };
};
