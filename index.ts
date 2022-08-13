import { renderDOM } from "./src/utils/renderDOM";

import { app, getLocation } from "./src/app";

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(".app", app);
  getLocation();
});

window.addEventListener("popstate", () => {
  getLocation();
});
