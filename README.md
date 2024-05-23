# nest-react-atm

Welcome to **nest-react-atm**, a basic Node.js + React application built using the Nest.js framework for the backend, Knex.js for database querying and migrations, and other tools for validation, authorization, and state management. This project showcases various programming and architectural capabilities.

## Features

- **Backend Framework**: [Nest.js](https://nestjs.com/)
- **Database Querying and Migrations**: [Knex.js](http://knexjs.org/)
- **Request Validation**: [zod](https://github.com/colinhacks/zod)
- **Authentication and Authorization**: [Passport.js](http://www.passportjs.org/)
- **Frontend Framework**: [React](https://reactjs.org/)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: ApplicationContexts

## Application Overview

The application provides basic ATM functionalities:

1. **Login Page**: Users authenticate by providing their email and PIN.
2. **Profile Page**: Displays all user accounts and allows for the creation of new accounts.
3. **Deposit**: Users can deposit money into their accounts.
4. **Withdraw**: Users can withdraw money, with the system dispensing the least number of bills possible.

## Setup Instructions

### Backend

1. Clone the repository into your desired directory.
2. Navigate to the backend folder in your terminal.
3. Run `docker-compose up -d` to download the PostgreSQL image and build/run the container ([Docker](https://www.docker.com/)).
4. Once the container is running, return to the terminal and run `pnpm start`.
5. The backend application will start on the default port 3000.

### Observations

1. Ensure to configure the `.env` file with appropriate JWT keys (4096-bit RS256 keys) and adjust the `knexfile.ts` for PostgreSQL connection.
2. Use the provided `client.http` file to test backend endpoints with the REST Client extension for VS Code.
3. Personal coding standards preferences are included in the project.

## Additional Notes

Feel free to explore the project and avaluate it according to your requirements. If you have any questions or issues, don't hesitate to reach out!
