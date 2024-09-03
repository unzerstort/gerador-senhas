import { showToast } from "./toast.js";

function copyPassword(buttonId) {
    const copyBtn = document.getElementById(buttonId);

    copyBtn.addEventListener('click', () => {
        const password = document.getElementById("password").innerText;
        
        copyTextToClipboard(password).then(() => showToast('Senha copiada com sucesso!', 'success')).catch(err => showToast(`Erro ao copiar o texto: ${err}`, 'error'));
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