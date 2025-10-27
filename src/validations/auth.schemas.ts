import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("El email es requerido").email("Email inválido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
