# ToDo
Backend REST APIs for managing categories and tasks including user authentication with local and google strategy.

1) clone the project and run npm install to install all the required dependcies
2) create .env file and provide the values of following variables
jwtSecret
clientID
clientSecret
dbuser
dbpasswd

here clientID and clientSecret you will get from google. you can refer to below link for this:
https://console.developers.google.com/
please provide authorised javascript origin : http://localhost:3000 and 
               authorised redirect uris: http://localhost:3000/auth/google/redirect

3) create 'testdb' in postgres.
4) you are ready to use this project now. 
4) before accessing any routes first of all you will have to create the user by auth/signup api or /auth/google api.    
   once user is authenticated you will get jwt token which you need to provide it in authroization header in bearer token before making any API call for tasks or categories.
