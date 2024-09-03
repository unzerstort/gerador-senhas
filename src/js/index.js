import { setupClipboard } from "./clipboard.js";

function passwordGenerator(isUpper, isLower, hasDigits, hasSymbols, length) {
    let dictionary = "";

    if (isUpper) {
        dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM";
    }
    if (isLower) {
        dictionary += "qwertyuiopasdfghjklzxcvbnm";
    }
    if (hasDigits) {
        dictionary += "1234567890";
    }
    if (hasSymbols) {
        dictionary += "!@#$%^&*()_+-={}[];<>:";
    }
    if (!(isUpper || isLower || hasDigits || hasSymbols)) {
        dictionary += "qwertyuiopasdfghjklzxcvbnm";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }

    return password;
}

function syncPassword(algorithm) {
    let uppercaseIsChecked = document.getElementById("uppercase").checked;
    let lowercaseIsChecked = document.getElementById("lowercase").checked;
    let digitsIsChecked = document.getElementById("digits").checked;
    let symbolsIsChecked = document.getElementById("symbols").checked;

    // TODO: pegar pelo id ao invés do querySelector
    const length = document.querySelector('input[type="range"]').value;

    const password = algorithm(uppercaseIsChecked, lowercaseIsChecked, digitsIsChecked, symbolsIsChecked, length);

    document.getElementById('password').innerText = password;
}

// TODO: passar algoritmo para essa função
function generatePassword() {
    syncPassword(passwordGenerator);
    const charNum = document.getElementById('charNum');
    const rangeValue = document.getElementById('rangeValue');

    charNum.addEventListener("change", () => syncPassword(passwordGenerator));
    rangeValue.addEventListener("change", () => syncPassword(passwordGenerator));
}

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

function setUpModalEvents() {
    const modal = document.getElementById('modal');
    const btn = document.getElementById('modal-btn');
    const close = document.getElementById('close');

    // opens modal
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // closes modal when closing button is clicked
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // closes modal when the user clicks outside of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // closes modal when the user presses esc
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
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
    checkboxListener(changePasswordStrength, 'attributes');
    generatePassword();
    setupClipboard();
    setUpModalEvents();
    addClickEventListeners();
    synchronizeRangeAndNumber();
    // TODO: criar uma função que centralize a geração de senhas:
    // atualmente, o fluxo de geração de senha está espalhado no arquivo index.js e index.html
    // criar um novo arquivo js responsável por isso com uma única função que será chamada aqui
});