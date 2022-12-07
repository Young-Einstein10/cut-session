export const $ = (elemSelector: string) => document.querySelector(elemSelector);
export const $ID = (id: string) => document.getElementById(id);

// For Routing
export const routeTo = (path: string) => (window.location.hash = `#${path}`);
