
# Dynamic Form Wizard

A React application that allows students to login and fill out dynamic multi-section forms fetched from an API.

## Features

- Student login with roll number and name
- Dynamic form rendering based on API response
- Multi-section form wizard with validation
- Progress tracking
- Responsive design

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui for UI components
- Fetch API for data fetching

## Project Structure

- `src/components`: UI components (LoginForm, FormWizard, FormSection, DynamicField)
- `src/services`: API service for user registration and form fetching
- `src/types`: TypeScript interfaces
- `src/pages`: Application pages

## How it Works

1. User enters roll number and name
2. Application registers user via POST /create-user
3. Application fetches form structure via GET /get-form
4. User navigates through form sections
5. Each section is validated before proceeding
6. On final submission, form data is logged to console

## API Endpoints

- POST /create-user — Registers the user (expects roll number and name)
- GET /get-form — Returns the dynamic form structure (expects roll number)

## Getting Started

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```
