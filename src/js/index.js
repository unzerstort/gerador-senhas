// slider

let output = document.getElementById("charNum");

let slider = document.getElementById("rangeValue").oninput = function() {
    let value = (this.value - this.min)/(this.max - this.min)*100;

    this.style.background = `linear-gradient(to right, rgb(117,252,117) ${value}%, rgb(214,214,214) ${value}%)`;;
    output.innerHTML = this.value;

}