// Helper function to generate a random character from the given dictionary
// TODO: criar module de utils
function getRandomCharacter(dictionary) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    return dictionary[randomIndex];
}

// Password generator function using Promises for potential async operations
// TODO: em vez da lista passar um objeto mesmo
function generatePassword([isUpper, isLower, hasDigits, hasSymbols, length]) {
    return new Promise((resolve) => {
        const uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM";
        const lowercase = "qwertyuiopasdfghjklzxcvbnm";
        const digits = "1234567890";
        const symbols = "!@#$%^&*()_+-={}[];<>:";

        let dictionary = '';
        if (isUpper) dictionary += uppercase;
        if (isLower) dictionary += lowercase;
        if (hasDigits) dictionary += digits;
        if (hasSymbols) dictionary += symbols;
        if (dictionary === '') dictionary = lowercase;

        let password = '';
        for (let i = 0; i < length; i++) {
            password += getRandomCharacter(dictionary);
        }

        resolve(password);
    });
}


// TODO: a ideia de usar promises é mostrar ao usuário que tá carregando ou que deu erro
//       adicione .catch e mostre erro com o toast e adicione um loader pro usuário ver o processamento (teste com um sleep na promise)
/**
 * Updates the DOM with a generated password by the algorithm
 * 
 * @param {HTMLInputElement} field - password input field
 * @param {callback} algorithm - The algorithm that generates a password
 * @param {[Boolean]} options - Boolean options
 */
function updatePasswordField(field, algorithm, options) {
    console.log("Update password fields: " + options)
    algorithm(options)
        .then(password => {
            field.innerText = password;
        });
}

// TODO: A função updatePasswordField tem que morrer. O tratamento da promise deve ser feita aqui
function updatePassword(passwordInput, checkboxes, length) {
    let options = checkboxes.map(input => input.checked);
    options.push(length);
    updatePasswordField(passwordInput, generatePassword, options);
}

function syncStrengthBarStep(strengthBarStep, [isUpper, isLower, hasDigits, hasSymbols]) {
    // TODO: criar uma função para calcular a força e só chamar ela aqui, alterando o DOM
    if (isUpper && isLower && hasDigits && hasSymbols) {
        strengthBarStep.className = "strong";
        strengthBarStep.setAttribute("aria-label", "Força da senha: forte");
    } else if ((isUpper || isLower) && (hasDigits || hasSymbols)) {
        strengthBarStep.className = "medium";
        strengthBarStep.setAttribute("aria-label", "Força da senha: média");
    } else {
        strengthBarStep.className = "weak";
        strengthBarStep.setAttribute("aria-label", "Força da senha: fraca");
    }
}

function addEventListeners(inputs, event, callback) {
    inputs.forEach(input => {
        input.addEventListener(event, callback);
    });
}

function synchronizeRangeAndNumber(rangeInput, numberInput) {
    rangeInput.addEventListener("input", e => {
        numberInput.value = e.target.value;
    });

    numberInput.addEventListener("input", e => {
        rangeInput.value = e.target.value;
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

    // initialization
    const defaultValue = 12;
    rangeInput.value = defaultValue;
    numberInput.value = defaultValue;
    console.log("numberInput: " + numberInput.value)
    updatePassword(passwordInput, checkboxes, numberInput.value);

    
    // Listeners
    addEventListeners([rangeInput, numberInput], "change", () => updatePassword(passwordInput, checkboxes, numberInput.value));
    formElement.addEventListener("change", () => syncStrengthBarStep(strengthBarStep, checkboxes.map(input => input.checked)));
    const elements = document.querySelectorAll(
        'input[type="checkbox"], button.generate'
    );
    addEventListeners(elements, "click", () => updatePassword(passwordInput, checkboxes, numberInput.value));
    synchronizeRangeAndNumber(rangeInput, numberInput);
}
