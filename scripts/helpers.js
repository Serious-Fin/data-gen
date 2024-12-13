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