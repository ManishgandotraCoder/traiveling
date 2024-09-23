# Project Setup

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- PostgreSQL (v12.x or later)

## Running the Back-end (NestJS)

1. Navigate to the back-end directory:

   ```sh
   cd back-end
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Configure the PostgreSQL connection in the `src/app.mpdule.ts` file:

   ```typescript
   export const DATABASE_CONFIG = {
     host: "localhost",
     port: 5432,
     username: "your_username",
     password: "your_password",
     database: "your_database",
   };
   ```

4. Run the NestJS application:

   ```sh
   npm run start
   ```

   The back-end server will start on `http://localhost:3000`.

## Running the Front-end (Angular)

1. Navigate to the front-end directory:

   ```sh
   cd front-end
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Run the Angular application:

   ```sh
   npm start
   ```

   The front-end application will start on `http://localhost:4200`.

## Connecting to PostgreSQL

1. Ensure PostgreSQL is installed and running on your machine.
2. Create a new database:

   ```sh
   createdb your_database
   ```

3. Update the PostgreSQL connection details in the `src/constants.ts` file in the back-end project as mentioned above.
4. The back-end application will automatically connect to the PostgreSQL database using the provided configuration.

## Additional Information

- For more details on NestJS, visit the [NestJS documentation](https://docs.nestjs.com/).
- For more details on Angular, visit the [Angular documentation](https://angular.io/docs).

## Project Overview

This project demonstrates a travel planning application with a focus on Gmail integration for user authentication and a dynamic interface that allows users to select travel plans between cities. The goal of the project is to showcase a practical understanding of web development, authentication systems, and travel scheduling using real-world data and scenarios.

Key Features

1. Email Authentication via Gmail:

- Users log in securely through Gmail integration, ensuring a simple and familiar authentication process.
- This approach leverages OAuth 2.0, ensuring data security and user privacy during the login process.

2. City Selection for Travel:

- Upon successful login, users are presented with a homepage featuring a selection of cities.
- Currently, the data is available for four cities: Amsterdam, Vienna, London, and Paris.
- Users can select their current location and a destination city from the available options to begin their travel planning.

3. Travel Plan Creation:

- Users can see the fastest travel plans that allow them to reach their destination in the shortest time possible.
- The system also allows users to recreate their own plan, giving them the flexibility to choose trains based on their preferred departure time.

4. Alternatives and Flexibility:

- If the user’s initial plan doesn’t fit their schedule, the system provides alternative travel options by tracking all available trains within the specified time period.
- This ensures that users have multiple choices and can select a travel time that best fits their personal timetable.

5. Focus on Four Cities:

- The application currently focuses on travel between four major European cities: Amsterdam, Vienna, London, and Paris.
- These cities serve as a proof of concept, showcasing the application’s capability in handling real-world travel scenarios.

Constraints and Future Work

- Current Limitation: At the moment, the data and functionality are restricted to the four aforementioned cities, but the framework can be easily extended to include additional locations and transportation methods.
- Future Enhancements: With more time and resources, additional features could be implemented, such as:
- Integration with more email providers for authentication.
- Adding more cities and countries for travel planning.
- Providing train options with fare comparisons and seat availability.
- Enabling real-time notifications for train schedules and delays.

Skill Set Demonstrated

This project highlights the following technical and problem-solving skills:

- Web Development: Creating a responsive and interactive user interface with modern frontend technologies.
- Authentication Systems: Integrating Gmail-based authentication using OAuth 2.0 for secure access.
- Data Handling: Managing train schedules and travel routes efficiently, with flexible options for the user.
- Project Management: Successfully narrowing down the scope to deliver a functional product within time constraints, with potential for future enhancements.

Final Thoughts

This project serves as a demonstration of
