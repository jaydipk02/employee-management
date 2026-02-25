# Employee Management System

A React-Redux application designed for managing employee records. This application allows users to view a list of employees, add new records, update existing information, and delete records with a confirmation prompt.

---

## Project Setup Instructions

Follow these steps to set up the project on your local machine:

1. Clone or extract the project folder to your local system.
2. Open the terminal and navigate to the project directory:
   cd employee-management
3. Install the required dependencies using npm:
   npm install

---

## How to Run the App

To start the development server, use the following command:
npm run dev

After running the command, open your browser and navigate to the URL displayed in the terminal (usually http://localhost:5173).

---

## How to Run Tests

The project includes unit and integration tests written with Vitest and React Testing Library to ensure code quality and reliability.

1. To run all tests in the terminal:
   npm test
2. To run tests in interactive UI mode:
   npm run test:ui

---

## Assumptions and Decisions

1. State Management: Redux Toolkit was selected for managing the global state. This ensures a predictable data flow across the application. We utilized createAsyncThunk to manage asynchronous API lifecycles effectively.
2. API Integration: Axios was chosen as the HTTP client because of its superior error handling and cleaner syntax for handling request and response data. MockAPI serves as the backend REST service.
3. Testing Strategy: Axios is mocked across the test suite. This decision ensures that the tests are fast, do not rely on an active internet connection, and do not perform actual write operations on the database. The test coverage includes Redux slices, shared components, and page-level integration.
4. UI and User Experience: A ConfirmDialog component was implemented to prevent accidental deletions. The search functionality is built using a selector that filters the employee list by ID to provide quick access to specific records.

---

## Tools and Technologies Used

- Frontend: React.js, CSS3
- State Management: Redux Toolkit
- HTTP Client: Axios
- Testing Framework: Vitest, React Testing Library
- Icons: React Icons