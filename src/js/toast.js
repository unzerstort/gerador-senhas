export const showToast = (message, type) => {
    const seconds = 3000, 
    toast = document.getElementById("toast");

    toast.className = `show font-medium toast-${type}`;
    toast.innerText = message;

    setTimeout(() => { toast.className = toast.className.replace("show", " "); }, seconds);
}