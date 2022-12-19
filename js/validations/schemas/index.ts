import { date, object, string } from "yup";

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

export const bookSessionSchema = object({
  title: string().max(75, "Maximum of 75 characters allowed"),
  date: date().required("Date is required"),
  notes: string().max(500, "Maximum of 500 characters allowed"),
});
