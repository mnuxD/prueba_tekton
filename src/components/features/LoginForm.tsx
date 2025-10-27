"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks";
import { Button, Input, Card } from "@/components/common";
import { loginSchema, LoginFormData } from "@/validations";
import Image from "next/image";

export const LoginForm: React.FC = () => {
  const { login, isLoggingIn } = useAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      const result = await login(data.email, data.password);

      if (result?.error) {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error al iniciar sesión"
      );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 md:mt-20" padding="lg">
      <div className="flex justify-center mb-8">
        <Image
          src="/tekton.svg"
          alt="Tekton Logo"
          width={100}
          height={100}
          className="w-20 h-3 md:w-40 md:h-6"
        />
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Iniciar Sesión
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Bienvenido a Tekton Challenge
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          {...register("email")}
          placeholder="correo@email.com"
          error={errors.email?.message}
          fullWidth
          disabled={isLoggingIn}
        />

        <Input
          label="Contraseña"
          type="password"
          {...register("password")}
          placeholder="••••••••"
          error={errors.password?.message}
          fullWidth
          disabled={isLoggingIn}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoggingIn}
          className="w-full"
        >
          Iniciar Sesión
        </Button>
      </form>
    </Card>
  );
};
