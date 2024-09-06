import { setUpModalEvents } from "./modal.js";
import { setupPassword  } from "./password.js";
import { passwordCopyEvent } from "./clipboard.js";

document.addEventListener("DOMContentLoaded", () => {
    setupPassword();
    setUpModalEvents();

    const password = 'password';
    passwordCopyEvent(password, 'copy');
    passwordCopyEvent(password, 'copy-password');
});