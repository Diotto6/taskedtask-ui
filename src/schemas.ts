import * as yup from "yup";

export const userSchema = yup.object({
  email: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve conter no minimo 8 caracteres")
    .required("Campo obrigatório"),
});
