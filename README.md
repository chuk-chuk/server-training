### Typescript API with MongoDB and Node/Express

Add .env file that contains the following variables:
PORT=xxxx
MONGO_URI=xxxx

- npm i
- npm run watch:server

When you are connected to the DB, make sure you have a collection called "tasks".

Use Postman to test routes:

- GET localhost:PORT/tasks
- POST localhost:PORT/tasks
- PUT localhost:PORT/tasks/:id
- DELETE localhost:PORT/tasks/:id
