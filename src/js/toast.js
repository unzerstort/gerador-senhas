export function showToast(message, type) {
    let toast = document.getElementById("toast");
    toast.className = `show font-medium toast-${type}`;
    toast.innerText = message;

    setTimeout(function () { toast.className = toast.className.replace("show", " "); }, 3000);
}