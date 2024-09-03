import { showToast } from "./toast.js";

function copyPassword(buttonId) {
    const copyBtn = document.getElementById(buttonId);

    copyBtn.addEventListener('click', () => {
        const password = document.getElementById("password").innerText;
        
        // TODO: colocar alerta de erro ao invés do console.log
        copyTextToClipboard(password).then(() => showToast()).catch(err => console.log(err));

    });
}

function copyTextToClipboard(textToCopy) {
    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(textToCopy);
    }
    return Promise.reject('The Clipboard API is not available.');
}

export function configureClipboardActions() {
    copyPassword('copy');
    copyPassword('copy-password');
}