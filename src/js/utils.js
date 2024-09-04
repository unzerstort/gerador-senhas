// Helper function to generate a random character from the given dictionary
export function getRandomCharacter(dictionary) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    return dictionary[randomIndex];
}

export function addEventListeners(inputs, event, callback) {
    inputs.forEach(input => {
        input.addEventListener(event, callback);
    });
}

export function getPasswordStrength(isUpper, isLower, hasDigits, hasSymbols) {
    if (isUpper && isLower && hasDigits && hasSymbols) {
        return "strong";
    } else if ((isUpper || isLower) && (hasDigits || hasSymbols)) {
        return "medium";
    } 

    return "weak";
}