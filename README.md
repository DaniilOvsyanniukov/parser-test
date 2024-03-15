# parser-test

## Prepare Backend
- Navigate to the backend directory: `cd backend`
- Install dependencies: `yarn`
- Create a `.env` file with the following content:
   JWT_SECRET=SecretKey
   MONGODB_URI=mongodb+srv://USER:X4xvXbStMqRV4KxM@cluster0.pcsi10k.mongodb.net/myDatabase

- Launch MongoDB and connect to your database using the provided URI.

## Prepare Frontend
- Navigate to the frontend directory: `cd ../frontend`
- Install dependencies: `yarn`
- Create a `.env` file with the following content:
  REACT_APP_API_URL=http://localhost:4000/api

  
## Running the Project
- To start the project, navigate to the project's root directory and run: `yarn start`

## Stopping the Project
- To stop the project, you can use: `yarn stop`
