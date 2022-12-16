import { navigateTo } from "../router";
import { resetCredentials } from "../store/slices/authSlice";

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
