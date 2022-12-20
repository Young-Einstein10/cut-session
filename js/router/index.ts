import UserDashboard from "../components/user/dashboard.js";
import UserLogin from "../components/user/login.js";
import UserRegister from "../components/user/register.js";
import StudioSessions from "../components/user/studio-sessions.js";
import SessionBookings from "../components/user/bookings.js";
import BookSession from "../components/user/book-session.js";

import MerchantDashboard, { Params } from "../components/merchant/dashboard";
import MerchantLogin from "../components/merchant/login";
import MerchantRegister from "../components/merchant/register";
import CreateSessions from "../components/merchant/create";
import MerchantBookings from "../components/merchant/bookings.js";
import NotFound from "../components/not-found";

import Component from "../lib/component.js";

interface MatchProps {
  route: {
    path: string;
    view: typeof Component;
  };
  result: RegExpMatchArray | null;
}

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match: MatchProps): Params => {
  const values = match?.result?.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values![i]];
    })
  );
};

export const navigateTo = (url) => {
  history.pushState(null, "", url);
  router();
};

const router = async () => {
  const routes: { path: string; view: typeof Component }[] = [
    { path: "/", view: UserLogin },
    { path: "/user/dashboard", view: UserDashboard },
    { path: "/user/dashboard/:id/book", view: BookSession },
    { path: "/user/dashboard/:id", view: StudioSessions },
    { path: "/user/session-bookings", view: SessionBookings },
    { path: "/user/login", view: UserLogin },
    { path: "/user/register", view: UserRegister },

    { path: "/merchant/dashboard", view: MerchantDashboard },
    { path: "/merchant/dashboard/bookings", view: MerchantBookings },
    { path: "/merchant/create", view: CreateSessions },
    { path: "/merchant/login", view: MerchantLogin },
    { path: "/merchant/register", view: MerchantRegister },

    { path: "/*", view: NotFound },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  view.render();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e: MouseEvent) => {
    const link = e.target as HTMLLinkElement;
    if (link.matches("[data-link]")) {
      e.preventDefault();
      // console.log("FOUND A MATCH", link);
      return navigateTo(link.href);
    }
    // console.log("NO_MATCH");
  });
  router();
});
