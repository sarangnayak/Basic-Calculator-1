// Get reference to the input field (calculator display)
let input = document.getElementById("inputBox");

// Get all button elements
let buttons = document.querySelectorAll("button");

// Store the user input as a string for building expressions
let string = "";

// Convert NodeList of buttons into an array for easier iteration
let arr = Array.from(buttons);

// Loop through each button and add a click event listener
arr.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Get the text inside the clicked button and remove extra spaces
        let value = e.target.innerText.trim();

        // Case 1: If "=" button is clicked → calculate the result
        if (value === "=") {
            try {
                // Replace percentage sign (%) with "/100" for calculation
                string = string.replace(/%/g, '/100');

                // Evaluate the mathematical expression safely
                string = eval(string);

                // Display the result in the input box
                input.value = string;
            } catch (err) {
                // If error in calculation, show "Error"
                input.value = "Error";

                // Reset after 1 second
                setTimeout(() => {
                   input.value = "0";
                   string = "";
                }, 1000);
            }

        // Case 2: If "AC" button is clicked → clear everything
        } else if (value === "AC") {
            string = "";
            input.value = "0";

        // Case 3: If "DEL" button is clicked → delete last character
        } else if (value === "DEL") {
            string = string.slice(0, -1); // remove last character
            input.value = string || '0'; // show "0" if string is empty

        // Case 4: For all other inputs (numbers/operators)
        } else {
            // If display is "0" and the clicked button is not a decimal
            // then reset string to avoid leading zeros
            if (input.value === '0' && value !== '.') {
                string = '';
            }

            // Add the clicked button value to the expression
            string += value;

            // Show updated expression in input box
            input.value = string;
        }
    });
});
