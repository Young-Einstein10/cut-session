import { navigateTo } from "../router";
import { resetCredentials } from "../store/slices/authSlice";
import { isBefore, isAfter, isEqual, addMinutes } from "date-fns";
import { getObjectKeys } from "../validations/helpers";

export const $ = (elemSelector: string) => document.querySelector(elemSelector);
export const $ll = (elemSelector: string) =>
  document.querySelectorAll(elemSelector);
export const $ID = (id: string) => document.getElementById(id);

// For Routing
export const routeTo = (path: string) => (window.location.hash = `#${path}`);

export const checkAuthentication = () => {
  const token = localStorage["token"];

  // Redirect user to login
  if (!token) {
    return navigateTo("login");
  }
};

export const logOut = (from: "user" | "merchant") => {
  resetCredentials();
  localStorage.clear();
  return navigateTo(`/${from}/login`);
};

export const isWeekDays = (value: string) => {
  const weekDayStartDateToCompare = new Date(`01/01/2011 09:00`);
  const weekDayEndDateToCompare = new Date(`01/01/2011 20:00`);
  const dateTimeValue = new Date(`01/01/2011 ${value}`);

  return (
    (isAfter(dateTimeValue, weekDayStartDateToCompare) ||
      isEqual(dateTimeValue, weekDayStartDateToCompare)) &&
    (isBefore(dateTimeValue, weekDayEndDateToCompare) ||
      isEqual(dateTimeValue, weekDayEndDateToCompare))
  );
};

export const isWeekend = (value: string) => {
  const weekEndStartDateToCompare = new Date(`01/01/2011 10:00`);
  const weekEndEndDateToCompare = new Date(`01/01/2011 22:00`);
  const dateTimeValue = new Date(`01/01/2011 ${value}`);

  return (
    (isAfter(dateTimeValue, weekEndStartDateToCompare) ||
      isEqual(dateTimeValue, weekEndStartDateToCompare)) &&
    (isBefore(dateTimeValue, weekEndEndDateToCompare) ||
      isEqual(dateTimeValue, weekEndEndDateToCompare))
  );
};

export const validateTimeSlot = (
  incStartsAt: string,
  incEndsAt: string,
  timeSlot: string
): boolean => {
  let errors = {};

  const startsAt = new Date(`01/01/2011 ${incStartsAt}`);
  const endsAt = new Date(`01/01/2011 ${incEndsAt}`);

  if (timeSlot) {
    const result = addMinutes(startsAt, parseInt(timeSlot));

    // If added minutes is not equal to the time entered, return error
    if (!isEqual(result, endsAt)) {
      errors = {
        message: `Time entered must be a ${timeSlot} minute duration`,
      };
    }
  }

  return getObjectKeys(errors).length === 0;
};
