const routes = {
  404: {
    template: "./templates/404.html",
    title: "404",
    description: "Page not found",
  },
  "/": {
    template: "./templates/home.html",
    title: "Home",
    description: "This is the home page",
  },
  "/src/index.html'": {
    template: "./templates/home.html",
    title: "Home",
    description: "This is the home page",
  },
  "/login": {
    template: "./templates/login.html",
    title: "Login",
    description: "This is the about page",
  },
  "/register": {
    template: "./templates/register.html",
    title: "Register",
    description: "This is the contact page",
  },
  "/dashboard": {
    template: "./templates/dashboard.html",
    title: "Dashboard",
    description: "This is the contact page",
  },
};

export default routes;
