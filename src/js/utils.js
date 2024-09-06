/**
 * Retrieves a random character from the provided dictionary string.
 *
 * @param {string} dictionary - A string of characters to choose from.
 * @returns {string} - A random character from the dictionary.
 */
export function getRandomCharacter(dictionary) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    return dictionary[randomIndex];
}

/**
 * Adds event listeners to a list of input elements.
 *
 * @param {Array<HTMLElement>} inputs - An array of HTML elements to which event 
 *                                      listeners will be added.
 * @param {string} event - The type of event to listen for (e.g., 'click').
 * @param {function} callback - The function to be called when the event is triggered.
 */
export function addEventListeners(inputs, event, callback) {
    inputs.forEach(input => {
        input.addEventListener(event, callback);
    });
}

/**
 * Determines the strength of a password based on its composition.
 *
 * @param {boolean} isUpper - Whether the password includes uppercase letters.
 * @param {boolean} isLower - Whether the password includes lowercase letters.
 * @param {boolean} hasDigits - Whether the password includes digits.
 * @param {boolean} hasSymbols - Whether the password includes symbols.
 * @returns {string} The strength of the password: 'strong', 'medium', or 'weak'.
 */
export function getPasswordStrength(isUpper, isLower, hasDigits, hasSymbols) {
    if (isUpper && isLower && hasDigits && hasSymbols) {
        return "strong";
    } else if ((isUpper || isLower) && (hasDigits || hasSymbols)) {
        return "medium";
    } 

    return "weak";
}
