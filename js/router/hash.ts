// Using Vite Glob's Import pattern to import files with deeper levels of nesting
const modules = import.meta.glob("../components/**/*.ts");

// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {
  // get the url path, replace hash with empty string
  let location = window.location.hash.replace("#", "");
  // if the path length is 0, set it to primary page route
  let pathname = window.location.pathname;

  console.log({ pathname, location });

  if (
    location === "" ||
    location.length == 0 ||
    location === "/src/" ||
    location === "/src/index.html"
  ) {
    location = "login";
  }

  const path = location || "notFound";

  pathname = pathname === "/merchant" ? "merchant" : "user";

  const componentPath = `../components/${pathname}/${path}.ts`;

  const { default: Component } = await modules[componentPath]();

  new Component().render();
};
// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();
