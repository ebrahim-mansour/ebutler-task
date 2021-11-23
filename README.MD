How to start the app in development mode:

Init backend by installing node_modules at first: 
  - npm install

Create a .env file at the backend directory to define environment variables, and allow connection with database as in .env.example, include the following key:
  - MONGO_URI=mongodb://127.0.0.1:27017/DATABASE_NAME

You must init the app with data by running the data-import script in package.json or you will get unauthorized error while using the application.
You may need to change the database name in the command after the parameter --db-name.
  - npm run data-import

Run the following command to start the application on port 3000
  - npm run dev

Here is postman link if you would like to test the deployed app
  - https://www.getpostman.com/collections/4252bfdb22e4866867d7
  - The current environment will be the deployed one, this can be changed by changing the environment variable BACKEND_URL of postman collection to http://localhost:3000/api

The app is running on https://ebutler.herokuapp.com/api/users
