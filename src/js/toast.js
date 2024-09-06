/**
 * Displays a toast notification with a specified message and type.
 *
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} type - The type of the toast ('success' or 'error'). 
 *                        This determines the toast's styling.
 */
export const showToast = (message, type, seconds = 3000) => {
    const toast = document.getElementById("toast");

    // Set the toast's specific class and message
    toast.className = `show font-medium toast-${type}`;
    toast.innerText = message;

    // Hides the toast after the specified duration
    setTimeout(() => { 
        toast.className = toast.className.replace("show", " "); 
    }, seconds);
}