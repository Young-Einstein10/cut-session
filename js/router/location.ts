// import routes from "./routes.js";
import * as templates from "../templates";

console.log(templates);

declare global {
  interface Window {
    route: (event: Event) => void;
  }
}

const route = (event) => {
  event = event || window.event; // get window.event if event argument not provided
  event.preventDefault();
  // window.history.pushState(state, unused, target link);
  window.history.pushState({}, "", event.target.href);
  locationHandler();
};

const locationHandler = async () => {
  let location = window.location.pathname; // get the url path
  // if the path length is 0, set it to primary page route
  console.log(location);

  if (
    location.length == 0 ||
    location === "/src/" ||
    location === "/src/index.html"
  ) {
    location = "/home";
  }
  // get the route object from the urlRoutes object
  // const route = routes[location] || routes["404"];

  const path =
    location.split("/").length === 2 ? `${location.split("/")[1]}` : "notFound";

  console.log(path);

  // get the html from the template
  const html = templates[path];

  // console.log("====================================");
  // console.log(html);
  // console.log("====================================");

  // set the content of the content div to the html
  // document.getElementById("app").innerHTML = html;
  // set the title of the document to the title of the route
  // document.title = route.title;
  // // set the description of the document to the description of the route
  // document
  //   ?.querySelector('meta[name="description"]')
  //   ?.setAttribute("content", route.description);
};

// add an event listener to the window that watches for url changes
window.onpopstate = locationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = route;
// call the urlLocationHandler function to handle the initial url
locationHandler();
