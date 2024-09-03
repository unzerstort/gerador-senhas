import { configureClipboardActions } from "./clipboard.js";
import { setUpModalEvents } from "./modal.js";
import { setupPassword  } from "./password.js";

function addClickEventListeners() {
    const elements = document.querySelectorAll(
        'input[type="checkbox"], button.generate'
    );

    elements.forEach((elem) => {
        elem.addEventListener("click", generatePassword);
    });
}

function synchronizeRangeAndNumber() {
    const rangeInput = document.querySelector('input[type="range"]');
    const numberInput = document.querySelector('input[type="number"]');

    // set the default value of both inputs to 12
    const defaultValue = 12;
    rangeInput.value = defaultValue;
    numberInput.value = defaultValue;

    // updates number input when range input changes
    rangeInput.addEventListener("input", (e) => {
        numberInput.value = e.target.value;
    });

    // updates range input when number input changes
    numberInput.addEventListener("input", (e) => {
        rangeInput.value = e.target.value;
    });
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
    document.getElementById(formId).addEventListener("change", () => {
        const formInputs = document.querySelectorAll("input[type='checkbox']:checked");
        let inputValue = [];
        formInputs.forEach(input => inputValue.push(input.value));
        event(inputValue);
    })

}

document.addEventListener("DOMContentLoaded", function () {
    setupPassword();
    configureClipboardActions();
    setUpModalEvents();

    // TODO: Move to password.js
    // generatePassword();
    //checkboxListener(changePasswordStrength, 'attributes');
    //addClickEventListeners();
    //synchronizeRangeAndNumber();
    
});