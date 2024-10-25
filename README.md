
# 🎯 Quiz Application Backend

## 🌟 Overview

This project is a backend for a Quiz Application developed using Node.js, Express, and MongoDB. It provides essential features such as creating, fetching, updating, and deleting quizzes and individual quiz questions. 🚀
## ✨ Features

- 🔍 Fetch all quizzes and specific quizzes by ID.
- ✏️ Create new quizzes with multiple questions.
- 🔄 Update entire quizzes or specific quiz questions by ID.
- ❌ Delete full quizzes or individual questions.
- 📈 Dynamic score calculation on quiz submissions.


## 🛠️ Technologies Used

- **🔙 Backend:** Node.js, Express for creating APIs and routing.
- **💾 Database:** MongoDB with Mongoose for schema modeling and data management.
- **🔑 Authentication:** JSON Web Tokens (JWT) for secure user authentication.
- **📧 Email Service:** Nodemailer for sending emails (e.g., password resets).
- **🛡 Security**: Helmet for security headers and bcryptjs for password hashing.
## 📦 Dependencies

Here’s a list of all the dependencies used in this project along with their versions:

```bash{
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.21.1",
"express-rate-limit": "^7.4.1",
"helmet": "^8.0.0",
"joi": "^17.13.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.7.2",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.1",
"nodemailer": "^6.9.15",
"nodemon": "^3.1.7"
  ```


## 🚀 Setup and Installation

Clone the project

```bash
  git clone https://github.com/MaulikPatel63/Quiz_Application.git
```

Go to the project directory

```bash
  cd Quiz_Application/backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

API will be available at:

```bash
  http://localhost:5000
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`=`<MONGO_URI>`

`PORT`=`<Your_Port`

`JWT_SECRET`=`<Your_Secret>`


## 🌐 Deployment

The backend is deployed on Render.

- **Live Backend URL :** [https://quiz-application-984w.onrender.com/](https://quiz-application-984w.onrender.com/)


## API Reference

#### Auth Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/auth/signup` | User signup. | Public |
| **POST** | `/api/v1/auth/login` | User login and token generation. | Public |
| **POST** | `/api/v1/auth/logout` | User logout. | Authenticated |
| **GET** | `/api/v1/auth/authCheck` | Check user authentication. | Authenticated |

#### Quiz Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/quiz/quiz-add` | Add a new quiz. | Authenticated |
| **GET** | `/api/v1/quiz/quiz-get` | Get all quizs with filtering and pagination. | Authenticated |
| **GET** | `/api/v1/quiz/quiz-get/:id` | Get Specific quizs with ID. | Authenticated |
| **PUT** | `/api/v1/quiz/quiz-update` | Update an existing quiz by ID. | Authenticated |
| **DELETE** | `/api/v1/quiz/quiz-delete` | Delete an quiz by ID. | Authenticated |
