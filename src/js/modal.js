
export function setUpModalEvents() {
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
