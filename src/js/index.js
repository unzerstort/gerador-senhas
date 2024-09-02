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

    document.getElementById('password').innerHTML = password;
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
        generatePassword();
    }
);

const copyBtn = document.getElementById("copy");

copyBtn.addEventListener('click', () => {
    const password = document.getElementById("password").innerHTML; 
    navigator.clipboard.writeText(password);
});

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
    } else if ((hasUppercase || hasLowercase) && (hasNumbers || hasSymbols)) {
        strength.className = "medium";
    } else {
        strength.className = "weak";
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
});