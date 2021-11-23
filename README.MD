Init backend by installing node_modules at first: 
  - npm install

Create a .env file at the backend directory to define environment variables, and allow connection with database, include the following key:
  - MONGO_URI=mongodb://127.0.0.1:27017/DATABASE_NAME

You must init the app with the super admin user by running the data-import script in package.json or you will get unauthorized error while creating new users
You may need to change the database name in the command after the parameter --db-name.
  - npm run data-import

Run the following command to start the application on port 3000
  - npm start

Here is postman link if you would like to test backend APIs
  -
