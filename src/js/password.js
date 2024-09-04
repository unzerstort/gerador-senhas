import { addEventListeners, getPasswordStrength, getRandomCharacter } from "./utils.js";

// Password generator function using Promises for potential async operations
function generatePassword([isUpper, isLower, hasDigits, hasSymbols, length]) {
    return new Promise((resolve) => {
        const digits = "1234567890",
            lowercase = "qwertyuiopasdfghjklzxcvbnm",
            symbols = "!@#$%^&*()_+-={}[];<>:",
            uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM";

        let dictionary = '',
            password = '';

        if (isUpper) { dictionary += uppercase; }
        if (isLower) { dictionary += lowercase; }
        if (hasDigits) { dictionary += digits; }
        if (hasSymbols) { dictionary += symbols; }
        if (dictionary === '') { dictionary = lowercase; }

        for (let index = 0; index < length; index++) {
            password += getRandomCharacter(dictionary);
        }

        resolve(password);
    });
}

/**
 * Updates the DOM with a generated password by the algorithm
 * 
 * @param {HTMLInputElement} field - password input field
 * @param {callback} algorithm - The algorithm that generates a password
 * @param {[Boolean]} options - Boolean options
 */
// Function updatePasswordField(field, algorithm, options) {
//     Algorithm(options)
//         .then(password => {
//             Field.innerText = password;
//         });
// }

function updatePassword(passwordInput, checkboxes, length) {
    const options = checkboxes.map(input => input.checked);
    options.push(length);
    generatePassword(options).then(password => {
        passwordInput.innerText = password;
    });
}

function syncStrengthBarStep(
    strengthBarStep, [isUpper, isLower, hasDigits, hasSymbols]
) {
    const translate = { 'strong': 'forte', 'medium': 'média', 'weak': 'fraca' },

        strength = getPasswordStrength(isUpper, isLower, hasDigits, hasSymbols);
    strengthBarStep.className = strength;
    strengthBarStep.setAttribute(
        "aria-label",
        `Força da senha: ${translate[strength]}`
    );
}

function synchronizeRangeAndNumber(rangeInput, numberInput) {
    rangeInput.addEventListener("input", event => {
        numberInput.value = event.target.value;

    });

    numberInput.addEventListener("input", event => {
        rangeInput.value = event.target.value;
    });
}

export function setupPassword() {
    const passwordInput = document.getElementById('password');
    const checkboxes = ["uppercase", "lowercase", "digits", "symbols"].map(
        input => document.getElementById(input)
    );
    const rangeInput = document.getElementById('length-slider-input');
    const numberInput = document.getElementById('length-input');
    const formElement = document.getElementById("attributes");
    const strengthBarStep = document.getElementById("strength");

    // Initialization with default value
    const defaultValue = 12;
    rangeInput.value = defaultValue;
    numberInput.value = defaultValue;
    updatePassword(passwordInput, checkboxes, numberInput.value);

    // Listeners
    addEventListeners(
        [rangeInput, numberInput],
        "change",
        () => updatePassword(passwordInput, checkboxes, numberInput.value)
    );
    formElement.addEventListener(
        "change",
        () => {
            syncStrengthBarStep(
                strengthBarStep,
                checkboxes.map(input => input.checked)
            )
        }
    );
    const elements = document.querySelectorAll(
        'input[type="checkbox"], button.generate'
    );

    addEventListeners(
        elements,
        "click",
        () => {
            updatePassword(
                passwordInput,
                checkboxes,
                numberInput.value
            )
        }
    );
    synchronizeRangeAndNumber(rangeInput, numberInput);
}
