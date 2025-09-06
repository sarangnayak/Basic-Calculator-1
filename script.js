let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let string = "";
let arr = Array.from(buttons);

arr.forEach((button) => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerText.trim();

        if (value === "=") {
            try {
                // For percentage, convert 'X%' to '(X/100)' before evaluating
                string = string.replace(/%/g, '/100');
                string = eval(string);
                input.value = string;
            } catch (err) {
                input.value = "Error";
                setTimeout(() => {
                   input.value = "0";
                   string = "";
                }, 1000);
            }
        } else if (value === "AC") {
            string = "";
            input.value = "0";
        } else if (value === "DEL") {
            string = string.slice(0, -1);
            input.value = string || '0';
        } else {
            if (input.value === '0' && value !== '.') {
                string = '';
            }
            string += value;
            input.value = string;
        }
    });
});
