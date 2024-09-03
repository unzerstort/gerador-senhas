// TODO: permitir toast de erro

export function showToast() {
    let toast = document.getElementById("toast");
    toast.className = "show font-medium";
    setTimeout(function () { toast.className = toast.className.replace("show", " "); }, 3000);
}