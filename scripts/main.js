import {generateSchemaExample, clearInputField, copyToClipboard, generateResponse} from "./helpers.js"

const generateSchemaExampleButton = document.getElementById("gen-example");
generateSchemaExampleButton.addEventListener("click", () => {
    generateSchemaExample();
});

const clearInputFieldButton = document.getElementById("clear-input");
clearInputFieldButton.addEventListener("click", () => {
    clearInputField();
});

const copyOutputFieldButton = document.getElementById("copy-to-clipboard");
copyOutputFieldButton.addEventListener("click", () => {
    copyToClipboard();
});

const generateButton = document.getElementById("gen-btn");
generateButton.addEventListener("click", () => {
    generateResponse();
});

const numberInput = document.getElementById('numberInput');
numberInput.addEventListener('change', () => {
    const value = parseInt(numberInput.value, 10);
    if (value < 1 || !value) {
      numberInput.value = 1; // Minimum value
    } else if (value > 25) {
      numberInput.value = 25; // Maximum value
    }
  });