/**
 * Sets up event listeners for handling modal operations.
 *
 * This function attaches event listeners to elements for opening 
 * and closing the modal. 
 * The modal can be opened by clicking a button, closed by clicking a close button, 
 * clicking outside the modal, or pressing the Escape key.
 */
export const setUpModalEvents = () => {
    const btn = document.getElementById('modal-btn');
    const close = document.getElementById('close');
    const modal = document.getElementById('modal');

    // Opens modal
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Closes modal when the close button is clicked
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Closes modal when the user clicks outside of it
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Closes modal when the user presses esc
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
}
