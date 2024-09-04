import { showToast } from "./toast.js";

export function copyTextToClipboard(textToCopy) {
    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(textToCopy);
    }
    return Promise.reject(new Error('The Clipboard API is not available.'));
}

export function passwordCopyEvent(buttonId) {
    const copyBtn = document.getElementById(buttonId);
    const password = document.getElementById("password").innerText;

    copyBtn.addEventListener('click', () => {
        copyTextToClipboard(password)
            .then(() => showToast('Senha copiada com sucesso!', 'success'))
            .catch(err => showToast(`Erro ao copiar o texto: ${err}`, 'error'));
    });
}