import { AuthResponse, User } from "@/types";

const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const generateToken = (email: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: "1234567890",
      email,
      iat: Date.now(),
      exp: Date.now() + 86400000, // 24 horas
    })
  );
  const signature = btoa("fake-signature-" + Date.now());
  return `${header}.${payload}.${signature}`;
};

class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(email: string, password: string): Promise<AuthResponse> {
    await simulateNetworkDelay();

    // Aca deberia ir la peticion real a la API de autenticacion
    // const response = await axios.post("/api/auth/login", {
    //   email,
    //   password,
    // });

    const token = generateToken(email);
    const user: User = {
      id: "1",
      email: email,
      name: email.split("@")[0],
    };

    return {
      success: true,
      token,
      user,
      message: "Login exitoso",
    };
  }
}

export const authService = new AuthService();
