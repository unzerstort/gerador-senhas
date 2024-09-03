// TODO: Use a promise here
// If we changee this to a more complex algorithm that takes time it would be
// nice to have a promise and trigger a loader while calculating, for example
function simplePasswordGenerator(isUpper, isLower, hasDigits, hasSymbols, length) {
    let dictionary = "";
    
    const uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const lowercase = "qwertyuiopasdfghjklzxcvbnm";
    const digits = "1234567890";
    const symbols =  "!@#$%^&*()_+-={}[];<>:";

    if (isUpper) {
        dictionary += uppercase;
    }
    if (isLower) {
        dictionary += lowercase;
    }
    if (hasDigits) {
        dictionary += digits;
    }
    if (hasSymbols) {
        dictionary += symbols;
    }
    if (!(isUpper || isLower || hasDigits || hasSymbols)) {
        dictionary += lowercase;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }

    return password;
}

function changePasswordField(field, algorithm, passwordLength, attributes) {
    const password = algorithm(
        attributes.isUpper, attributes.isLower, attributes.hasDigits, attributes.hasSymbols, passwordLength
    );

    field.innerText = password;
}


// TODO: rename me please
export function setupPassword() {
    // TODO: add docstring explaning that this 
    // function centralizes the password generation flow
    const passwordInput = document.getElementById('password');

    // TODO: you dont need this inputs, only their ids. Use a list to hold them all
    // using a list will allow you to write the changePasswordField(..., attributes) as a [inp.checked for inp in myinputs] (usar map)
    const uppercaseInput = document.getElementById("uppercase");
    const lowerCaseInput = document.getElementById("lowercase");
    const digitInput = document.getElementById("digits");
    const symbolInput = document.getElementById("symbols");

    // TODO: rename charnum name
    const charNum = document.getElementById('charNum');
    const rangeValue = document.getElementById('rangeValue');

    // Generates the password when the page is loaded
    changePasswordField(
        passwordInput, 
        simplePasswordGenerator,
        charNum.value,
        {"isUpper": uppercaseInput.checked, "isLower": lowerCaseInput.checked, "hasDigits": digitInput.checked, "hasSymbols": symbolInput.checked}
    ); // Add to readme that function usage heere allow writing complex function generation without changing much of the code

    // TODO: refactor to avoid duplicating code
    charNum.addEventListener("change", () => {
        changePasswordField(
            passwordInput, 
            simplePasswordGenerator,
            charNum.length,
            {"isUpper": uppercaseInput.checked, "isLower": lowerCaseInput.checked, "hasDigits": digitInput.checked, "hasSymbols": symbolInput.checked}
        );
    });
    rangeValue.addEventListener("change", () => {
        changePasswordField(
            passwordInput, 
            simplePasswordGenerator,
            charNum.length,
            {"isUpper": uppercaseInput.checked, "isLower": lowerCaseInput.checked, "hasDigits": digitInput.checked, "hasSymbols": symbolInput.checked}
        );
    });
}