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