import { addEventListeners, getPasswordStrength, getRandomCharacter } from "./utils.js";

/**
 * Generates a random password based on the specified options.
 *
 * @param {boolean} options isUpper - Whether to include uppercase letters.
 * @param {boolean} options isLower - Whether to include lowercase letters.
 * @param {boolean} options hasDigits- Whether to include digits.
 * @param {boolean} options hasSymbols - Whether to include symbols.
 * @param {number} options length - The length of the password.
 * @returns {Promise<string>} A promise that resolves to the generated password.
 */
function generatePassword([isUpper, isLower, hasDigits, hasSymbols, length]) {
    return new Promise((resolve) => {
        const digits = "1234567890";
        const lowercase = "qwertyuiopasdfghjklzxcvbnm";
        const symbols = "!@#$%^&*()_+-={}[];<>:";
        const uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM";

        let dictionary = '';
        let password = '';

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
 * Updates the password field with a newly generated password.
 *
 * @param {HTMLElement} passwordInput - Element that displays the password.
 * @param {Array<HTMLInputElement>} checkboxes - Elements indicating user preferences.
 * @param {number} length - The desired length of the password.
 */
function updatePassword(passwordInput, checkboxes, length) {
    const options = checkboxes.map(input => input.checked);
    options.push(length);
    generatePassword(options).then(password => {
        passwordInput.innerText = password;
    });
}

/**
 * Synchronizes the strength bar with the password strength.
 *
 * @param {HTMLElement} strengthBarStep - Element representing the strength bar.
 * @param {boolean} options isUpper - Whether to include uppercase letters.
 * @param {boolean} options isLower - Whether to include lowercase letters.
 * @param {boolean} options hasDigits- Whether to include digits.
 * @param {boolean} options hasSymbols - Whether to include symbols.
 */
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

/**
 * Synchronizes the value of the range input with the number input.
 *
 * @param {HTMLInputElement} rangeInput
 * @param {HTMLInputElement} numberInput
 */
function synchronizeRangeAndNumber(rangeInput, numberInput) {
    rangeInput.addEventListener("input", event => {
        numberInput.value = event.target.value;

    });

    numberInput.addEventListener("input", event => {
        rangeInput.value = event.target.value;
    });
}

/**
 * Initializes UI with default values.
 *
 * @param {HTMLInputElement} rangeInput 
 * @param {HTMLInputElement} numberInput 
 * @param {HTMLInputElement} passwordInput 
 * @param {Array<HTMLInputElement>} checkboxes
 * @param {number} defaultValue 
 */
function initializePasswordUI(
    rangeInput,
    numberInput, 
    passwordInput, 
    checkboxes, 
    defaultValue
) {
    rangeInput.value = defaultValue;
    numberInput.value = defaultValue;
    updatePassword(passwordInput, checkboxes, numberInput.value);
}

/**
 * Connects inputs and its events.
 *
 * @param {HTMLInputElement} rangeInput 
 * @param {HTMLInputElement} numberInput 
 * @param {HTMLInputElement} passwordInput 
 * @param {Array<HTMLInputElement>} checkboxes
 * @param {HTMLElement} formElement 
 * @param {HTMLElement} strengthBarStep 
 */
function attachEventListeners(
    rangeInput,
    numberInput,
    passwordInput,
    checkboxes,
    formElement,
    strengthBarStep
) {
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

/**
 * Sets up the password generation and UI elements.
 */
export function setupPassword() {
    const passwordInput = document.getElementById('password');
    const checkboxes = ["uppercase", "lowercase", "digits", "symbols"].map(
        input => document.getElementById(input)
    );
    const rangeInput = document.getElementById('length-slider-input');
    const numberInput = document.getElementById('length-input');
    const formElement = document.getElementById("attributes");
    const strengthBarStep = document.getElementById("strength");

    initializePasswordUI(rangeInput,
        numberInput, 
        passwordInput, 
        checkboxes, 
        12
    );

    attachEventListeners(
        rangeInput,
        numberInput,
        passwordInput,
        checkboxes,
        formElement,
        strengthBarStep
    );
}
