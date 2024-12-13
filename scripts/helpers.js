export function generateSchemaExample() {
    const examples = [`-- create a basic table for users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    signup_date DATE DEFAULT CURRENT_DATE
);`,
`-- create a table for employees
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL, /*employee name*/
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10, 2) CHECK (salary > 0),
    department_id INT
);`,
`-- course table
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) DEFAULT 0.00,
    is_published BOOLEAN DEFAULT FALSE,
    instructor_id INT NOT NULL
);`]
    const inputField = document.getElementById("input-area");
    const text = examples[Math.floor(Math.random() * examples.length)];
    inputField.innerHTML = text;
}

export function clearInputField() {
    const inputField = document.getElementById("input-area");
    inputField.innerHTML = "";
}

export function copyToClipboard() {
    const inputField = document.getElementById("output-area");
    navigator.clipboard.writeText(inputField.value);
}

export async function generateResponse() {
    const button = document.getElementById("gen-btn");
    const spinner = document.getElementById('spinner');

    button.disabled = true;
    spinner.classList.add('visible');

    try {
        await queryAgent()
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        button.disabled = false;
        spinner.classList.remove('visible');
    }
}

async function queryAgent() {
    const inputText = document.getElementById("input-area").value;

    try {
        // Send the text to the server
        const response = await fetch("http://localhost:8080/ping", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
        });

        if (!response.ok) {
        throw new Error("Network response was not ok");
        }

        // Parse the response
        const result = await response.json();
        document.getElementById("output-area").value = result.processedText;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output-area").value = "An error occurred!";
    }
}