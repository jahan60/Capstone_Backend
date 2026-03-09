## Smart Stock Manager
Backend: 
## Introduction:
This is the backend API for the Smart Stock Manager application. It handles authentication, product management, stock tracking, alerts and user operations. 

## The backend build with Node.js, Express and MongoDB.

## What this backend does: 
The backend provides all the core functionality for the inventory system:
1. User login (JWT authentication)
2. Protected routes for inventory and stocks. 
3. CRUD operations for Products. 
4. Stock tracking and low stock alerts.
4. All data is stored in MongoDB using Mongoose models. 

## Technology used:
1. Node.js and Express: serving and routing
2. MongoDB and Mongoose: database and schemas.
3. JWT: Authentication.
4. bcrypt: password. 
5. dotenv: env variables.
6. CORS: cross origin support.
7. 3rd part API: OpenAI API key used for predict stock. 

## Authentication:The backend uses JWT based authentication.
1. Users log in and receive a token.
2. Protected routes are require the token in the header.
3. authMiddleware verifies the token.

## Managing sensitive backend credentials: 
I will paste paste the required environment variables(MONGO_URI, JWT secret, and 3rd party APIkey) in the Canvas submission link comment section. 

## Sample Data: 
Sample Product, User, Alets, and Stock data is included in the package.json as a fallback in case the MongoDB database is not accessible. 























## Resources:
https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/create-compound-index/#std-label-index-create-compound

https://developers.openai.com/api/docs/guides/text

https://developers.openai.com/api/docs/libraries

