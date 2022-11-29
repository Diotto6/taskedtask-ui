import * as yup from "yup";

export const createUserSchema = yup.object({
  firstName: yup
    .string()
    .required("Campo obrigatório")
    .matches(/^[a-záàâãéèêíïóôõöúçñ ]+$/i, "Digite um nome válido"),
  lastName: yup
    .string()
    .required("Campo obrigatório")
    .matches(/^[a-záàâãéèêíïóôõöúçñ ]+$/i, "Digite um sobrenome válido"),
  email: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve conter no minimo 8 caracteres")
    .required("Campo obrigatório"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas devem ser iguais"),
});

export const userSchema = yup.object({
  email: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve conter no minimo 8 caracteres")
    .required("Campo obrigatório"),
});

export const messageSchema = yup.object({
  message: yup
    .string()
    .min(4, "Campo deve conter no minimo 4 caracteres")
    .required("Campo obrigatório"),
});
