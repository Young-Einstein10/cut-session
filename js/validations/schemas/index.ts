import { isWeekDays, isWeekend } from "./../../utils/helpers";
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
  bookSession: bookSessionSchema,
  createSession: createSessionSchema,
};

export default validationSchemas;
