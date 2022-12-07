import { object, string } from "yup";

export const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export const registerUserSchema = object({
  username: string().required(),
  password: string().required(),
});

export const registerMerchantSchema = object({
  name: string().required(),
  username: string().required(),
  email: string().email().required(),
  cityOfResidence: string().required(),
  phoneNumber: string().required(),
  dob: string().required(),
  password: string().required(),
});
