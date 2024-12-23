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
    course_id INT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) DEFAULT 0.00,
    is_published BOOLEAN DEFAULT FALSE,
    instructor_id INT NOT NULL
);`,
`CREATE TABLE Persons (
	PersonID INT PRIMARY KEY,
	PersonID2 INT PRIMARY KEY
);
CREATE TABLE Orders (
	OrderID INT NOT NULL,
	OrderID2 INT,
	PersonID INT,
	PersonID2 integer,
	PRIMARY KEY (OrderID, OrderID2),
	CONSTRAINT FK_PersonOrder FOREIGN KEY (PersonID, PersonID2) REFERENCES Persons(PersonID, PersonID2)
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
    const ignoreDefault = !document.getElementById('generateDefaults').checked;
    let numberInput = parseInt(document.getElementById('numberInput').value, 10);
    if (numberInput < 1 || !numberInput) {
        numberInput = 1;
    } else if (numberInput > 25) {
        numberInput = 25;
    }

    try {
        const response = await fetch("https://db-populator.fly.dev/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            text: inputText,
            rowCount: numberInput,
            ignoreDefault: ignoreDefault
        }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        document.getElementById("output-area").value = result.processedText;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output-area").value = "An error occurred!";
    }
}