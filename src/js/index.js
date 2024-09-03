// password generator

function generatePassword() {
    let dictionary = "";

    let uppercaseIsChecked = document.getElementById("uppercase").checked;
    let lowercaseIsChecked = document.getElementById("lowercase").checked;
    let digitsIsChecked = document.getElementById("digits").checked;
    let symbolsIsChecked = document.getElementById("symbols").checked;

    if (uppercaseIsChecked) {
        dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM";
    }
    if (lowercaseIsChecked) {
        dictionary += "qwertyuiopasdfghjklzxcvbnm";
    }
    if (digitsIsChecked) {
        dictionary += "1234567890";
    }
    if (symbolsIsChecked) {
        dictionary += "!@#$%^&*()_+-={}[];<>:";
    }
    if (!(uppercaseIsChecked || lowercaseIsChecked || digitsIsChecked || symbolsIsChecked)) {
        dictionary += "qwertyuiopasdfghjklzxcvbnm";
    }

    const length = document.querySelector('input[type="range"]').value;

    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }

    document.getElementById('password').innerText = password;
    console.log(password);
}

[
    ...document.querySelectorAll(
        'input[type="checkbox"], button.generate'),
].forEach((elem) => {
    elem.addEventListener("click", generatePassword);
});

document.querySelector('input[type="range"]').addEventListener(
    "input", (e) => {
        document.querySelector(
            "input[type=number]").value = e.target.value;
    }
);

document.querySelector('input[type="number"]').addEventListener(
    "input", (e) => {
        document.querySelector(
            "input[type=range]").value = e.target.value;
    }
);

function copyPassword(buttonId) {
    const copyBtn = document.getElementById(buttonId);

    copyBtn.addEventListener('click', () => {
        const password = document.getElementById("password").innerText;
        copyTextToClipboard(password).then(() => showToast()).catch(err => console.log(err));

    });
}

function showToast() {
    let toast = document.getElementById("toast");
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", " "); }, 3000);
}

function copyTextToClipboard(textToCopy) {
    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(textToCopy);
    }
    return Promise.reject('The Clipboard API is not available.');
}

// strength bar
function changePasswordStrength(e) {
    console.log(e)

    const hasUppercase = e.includes("uppercase");
    const hasLowercase = e.includes("lowercase");
    const hasNumbers = e.includes("digits");
    const hasSymbols = e.includes("symbols");

    let strength = document.getElementById("strength");

    if (hasUppercase && hasLowercase && hasNumbers && hasSymbols) {
        strength.className = "strong";
        strength.setAttribute("aria-label", "Força da senha: forte");
    } else if ((hasUppercase || hasLowercase) && (hasNumbers || hasSymbols)) {
        strength.className = "medium";
        strength.setAttribute("aria-label", "Força da senha: média");
    } else {
        strength.className = "weak";
        strength.setAttribute("aria-label", "Força da senha: fraca");
    }
}

function checkboxListener(event, formId) {
    checks = document.getElementById(formId).addEventListener("change", () => {
        const formInputs = document.querySelectorAll("input[type='checkbox']:checked");
        let inputValue = [];
        formInputs.forEach(input => inputValue.push(input.value));
        event(inputValue);
    })

}

document.addEventListener("DOMContentLoaded", function (event) {
    checkboxListener(changePasswordStrength, 'attributes');
    generatePassword();
    copyPassword('copy');
    copyPassword('copy-password');
});