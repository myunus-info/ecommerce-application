#How to start the app
npm install [for installing dependencies]
npm start [start at the development environment]
npm run start:prod [start at the production environment]

#Technologies used
Node.js
Express.js
MongoDB

#Data format for posting to the endpoints

http://localhost:5000/api/auth/register
{
"username": "khaled@gmail.com",
"password": "123456",
"typeOfUser": "seller"
}
OR
{
"username": "khaled@gmail.com",
"password": "123456",
"typeOfUser": "buyer"
}

http://localhost:5000/api/auth/login
{
"username": "khaled@gmail.com",
"password": "123456"
}

http://localhost:5000/api/seller/create-catalog
{
"products": [
{
"name": "furniture",
"price": 10000
}
]
}
