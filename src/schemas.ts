import * as yup from "yup";

export const userSchema = yup.object({
  email: yup.object().required(),
  password: yup.object().required(),
});
