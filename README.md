# Fake Store Website 
A dummy e-commerce website was created using MongoDB, Express, React, and Node.js (MERN stack). The product data was taken from the [Fake Store API](https://fakestoreapi.com/) with Stripe for payment processing and JWT authentication using Bearer tokens. 

## Installation and Setup
1. Clone the repository
   ``` bash
   git clone https://github.com/bcw117/Fake-Store-Website.git
   ```
2. Navigate to the *server* directory and add a .env file:
   ``` env
   ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
   REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
   DATABASE_URI=YOUR_MONGODB_DATABASE_URI
   STRIPE_SECRET=YOUR_STRIPE_SECRET
   ```
3. Run the following commands in the *server* directory to get the server running:
   ``` bash
   npm i
   npm run dev
   ```
4. Navigate to the *client* directory and run the following commands:
   ``` bash
   npm i
   npm run start
   ```
5. Visit your website on the browser using the link to your local/network server
   
