# Fake Store Website 
A dummy e-commerce website that you can visit and use to practice shopping online. 
The site was developed using MongoDB, Express, React, and Node.js. The product data is fetched from [Fake Store API](https://fakestoreapi.com/), payments are processed using Stripe and JWT authentication is implemented using Bearer tokens. 

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
### For local installations:
1. Run the following commands in the *server* directory to get the server running:
   ``` bash
   npm i
   npm run dev
   ```
2. Navigate to the *client* directory and run the following commands:
   ``` bash
   npm i
   npm run start
   ```
### Using Docker:
1. Run the following commands in the root directory:
   ``` bash
   docker-compose up
   ```

## Notes:
- Invalid ELF header error with bcrypt when constructing Docker container, uninstall and reinstall bcrypt using npm within the container/your local machine to fix the issue.


   
