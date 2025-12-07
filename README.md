#Project Name: Wheel Point

##LiveURL:https://wheel-point.vercel.app/


##Features & Technology Stack.

1. user can sign up and login anf after each login will get a token which can be used to access other routes

2. admin is able to create vehicles, update and delete

3. customer can see all the vehicles properly and based of availability book a vehicle

4.customers can update his booking status as cancel and admin can change the status as cancel...

5. password and vehicle availibilty has been restricted so far. 

6.Code structures have been followed modular patter


Node.js | TypeScript |Express.js| JWT Token| PostgreSQL | bcryptjs 


##Setup & Usage Instructions.
1.run npm install to get all packages

2. define the 3 parameter in the env 
CONNECTION_STRING= for postgres sql connnection string
PORT=port number 
JWT_SECRET=KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30


3.Signup for 2 users as role customer and admin..

4.login and get the token..based on that token user access is restricted..
