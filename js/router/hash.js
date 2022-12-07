// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {
  // get the url path, replace hash with empty string
  let location = window.location.hash.replace("#", "");
  // if the path length is 0, set it to primary page route

  console.log(location);

  if (
    location === "" ||
    location.length == 0 ||
    location === "/src/" ||
    location === "/src/index.html"
  ) {
    location = "login";
  }

  const path = location || "notFound";

  console.log(path);

  const { default: Component } = await import(`../components/${path}.ts`);

  new Component().render();
};
// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();
