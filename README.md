# Expense Tracker Application

This is a full-stack expense tracker application built with React, TypeScript, and Spring Boot. The application allows users to track their transactions and view their current balance. The frontend is developed using React with TypeScript, and the backend is powered by Spring Boot.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register and login functionalities for users.
- **Transaction Management**: Add, view, and remove transactions.
- **Balance Calculation**: Automatic balance updates based on transactions.
- **Responsive Design**: Optimized for mobile and desktop views.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Context API for state management
  - CSS for styling
- **Backend**:
  - Java
  - Spring Boot
  - Spring Security
  - H2 Database (for development)
  - JPA for database interactions
- **Build Tools**:
  - Maven for backend
  - npm/yarn for frontend

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js and npm/yarn installed
- Java 17 or higher installed
- Maven installed

## Backend Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/expense-tracker.git
    cd expense-tracker/backend
    ```

2. **Build the Backend**:
    ```bash
    mvn clean install
    ```

3. **Run the Backend**:
    ```bash
    mvn spring-boot:run
    ```

4. **API Endpoints**:
   - `POST /api/auth/register`: Register a new user
   - `POST /api/auth/login`: Authenticate a user
   - `GET /api/transactions`: Get all transactions for the authenticated user
   - `POST /api/transactions`: Create a new transaction
   - `DELETE /api/transactions/{id}`: Delete a transaction by ID

## Frontend Setup

1. **Navigate to the Frontend Directory**:
    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Frontend**:
    ```bash
    npm start
    # or
    yarn start
    ```

## Usage

1. **Register a New User**: Access the application in your browser at `http://localhost:3000` and register a new user.
2. **Login**: Use your credentials to log in.
3. **Manage Transactions**: Add new transactions, view your transaction history, and see your current balance.

## Project Structure

```bash
expense-tracker/
├── backend/              # Spring Boot application (Java)
│   ├── src/
│   └── pom.xml           # Maven build file
├── frontend/             # React application (TypeScript)
│   ├── src/
│   ├── public/
│   └── package.json      # Node.js dependencies
├── README.md             # Project documentation
└── .gitignore            # Git ignore file
