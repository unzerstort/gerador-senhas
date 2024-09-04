
export const setUpModalEvents = () => {
    const btn = document.getElementById('modal-btn'),
    close = document.getElementById('close'),
    modal = document.getElementById('modal');

    // Opens modal
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Closes modal when closing button is clicked
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
