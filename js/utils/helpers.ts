import { resetCredentials } from "../store/slices/authSlice";

export const $ = (elemSelector: string) => document.querySelector(elemSelector);
export const $ID = (id: string) => document.getElementById(id);

// For Routing
export const routeTo = (path: string) => (window.location.hash = `#${path}`);

export const checkAuthentication = () => {
  const token = localStorage["token"];

  // Redirect user to login
  if (!token) {
    return routeTo("login");
  }
};

export const logOut = () => {
  resetCredentials();
  localStorage.removeItem("token");
  routeTo("login");
};
