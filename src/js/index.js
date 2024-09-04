import { setUpModalEvents } from "./modal.js";
import { setupPassword  } from "./password.js";

document.addEventListener("DOMContentLoaded", () => {
    setupPassword();
    setUpModalEvents();
});