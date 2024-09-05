import { showToast } from "./toast.js";

/**
 * Copies a given text to the clipboard.
 *
 * Uses the Clipboard API if available. Returns a promise that resolves when the text
 * is successfully copied or rejects with an error if the API is not available.
 *
 * @param {string} textToCopy - The text that will be copied to the clipboard.
 * 
 * @returns {Promise<void>} A promise that resolves if the text was copied 
 * successfully, or rejects with an error if the Clipboard API is not available.
 */
export function copyTextToClipboard(textToCopy) {
    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(textToCopy);
    }
    return Promise.reject(new Error('The Clipboard API is not available.'));
}

/**
 * Sets up an event listener on a button to copy the password to 
 * the clipboard when clicked.
 *
 * @param {string} buttonId - The ID of the button element that 
 * triggers the copy action.
 */
export function passwordCopyEvent(buttonId) {
    const copyBtn = document.getElementById(buttonId);
    const password = document.getElementById("password").innerText;

    copyBtn.addEventListener('click', () => {
        copyTextToClipboard(password)
            .then(() => showToast('Senha copiada com sucesso!', 'success'))
            .catch(err => showToast(`Erro ao copiar o texto: ${err}`, 'error'));
    });
}