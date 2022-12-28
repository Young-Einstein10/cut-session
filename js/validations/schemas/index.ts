import { isWeekDays, isWeekend } from "./../../utils/helpers";
import { date, object, string } from "yup";

export const loginSchema = object({
  username: string()
    .min(6, "Username has to be a minimum of 6 characters")
    .max(20, "Username has to be a maximum of 20 characters")
    .required("Username is required"),
  password: string()
    .min(6, "password has to be a minimum of 6 characters")
    .required(),
});

export const registerUserSchema = object({
  name: string()
    .min(2, "name has to be a minimum of 2 characters")
    .max(25, "name can only be a maximum of 25 characters")
    .required("name is required"),
  username: string()
    .min(6, "username has to be a minimum of 6 characters")
    .max(20, "username can only be a maximum of 20 characters")
    .required(),
  email: string()
    .email("Invalid email address")
    .max(50, "email can only be a maximum of 50 characters")
    .required("email is required"),
  cityOfResidence: string().max(
    20,
    "city can only be a maximum of 20 characters"
  ),
  phoneNumber: string().max(
    20,
    "phone number can only be a maximum of 20 characters"
  ),
  dob: string().required("Date of birth is required"),
  password: string()
    .min(6, "password has to be a minimum of 6 characters")
    .required("password is required"),
});

export const registerMerchantSchema = object({
  name: string()
    .min(2, "name has to be a minimum of 2 characters")
    .max(25, "name can only be a maximum of 25 characters")
    .required("name is required"),
  username: string()
    .min(6, "username has to be a minimum of 6 characters")
    .max(20, "username can only be a maximum of 20 characters")
    .required(),
  email: string()
    .email("Invalid email address")
    .max(50, "email can only be a maximum of 50 characters")
    .required("email is required"),
  cityOfOperation: string()
    .max(20, "city can only be a maximum of 20 characters")
    .required("city of operation is required"),
  phoneNumber: string().max(
    20,
    "phone number can only be a maximum of 20 characters"
  ),
  dob: string().required("Date of birth is required"),
  password: string()
    .min(6, "password has to be a minimum of 6 characters")
    .required("password is required"),
});

export const bookSessionSchema = object({
  title: string().max(75, "Maximum of 75 characters allowed"),
  date: date().required("Date is required"),
  notes: string().max(500, "Maximum of 500 characters allowed"),
});

const WeekDay = "WeekDay";
const WeekEnd = "WeekEnd";

export const createSessionSchema = object({
  type: string().oneOf([WeekDay, WeekEnd], "Session type must be selected."),
  timeslot: string().oneOf(["45", "60", "90"], "Select a time slot"),
  startsAt: string()
    .required("Select a Start Time")
    .when("type", {
      is: WeekDay,
      then: (schema) =>
        schema.test({
          message: "Sessions can only be within 9am - 8pm on WeekDays",
          name: "is-session-start-weekday",
          test: (value) => isWeekDays(value as string),
        }),
      otherwise: (schema) => schema,
    })
    .when("type", {
      is: WeekEnd,
      then: (schema) =>
        schema.test({
          message: "Sessions can only be within 10am - 10pm on WeekDays",
          name: "is-session-start-weekend",
          test: (value) => isWeekend(value as string),
        }),
    }),
  endsAt: string()
    .required("Select a end time")
    .when("type", {
      is: WeekDay,
      then: (schema) =>
        schema.test({
          message: "Sessions can only be within 9am - 8pm on WeekDays",
          name: "is-session-end-weekday",
          test: (value) => isWeekDays(value as string),
        }),
    })
    .when("type", {
      is: WeekEnd,
      then: (schema) =>
        schema.test({
          message: "Sessions can only be within 10am - 10pm on WeekDays",
          name: "is-session-end-weekend",
          test: (value) => isWeekend(value as string),
        }),
    }),
  // .when("timeslot", ([timeslot], schema) => {
  //   return timeslot
  //     ? schema.when(["startsAt", "endsAt"], ([startsAt, endsAt], schema) => {
  //         return validateTimeSlot(startsAt, endsAt, timeslot);
  //       })
  //     : schema;
  // }),
});

const validationSchemas = {
  login: loginSchema,
  registerUser: registerUserSchema,
  registerMerchant: registerMerchantSchema,
  bookSession: bookSessionSchema,
  createSession: createSessionSchema,
};

export default validationSchemas;
