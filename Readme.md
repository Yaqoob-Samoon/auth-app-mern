AuthApp 🔐 (MERN Stack Authentication)
AuthApp is a full-stack MERN authentication application that demonstrates secure and real-world user authentication using modern web technologies.
This project focuses on clean architecture, secure authentication, and scalable code structure.
🚀 What is AuthApp?
AuthApp allows users to:
Register a new account
Login securely
Access protected routes
Logout safely
It follows industry-standard authentication practices used in production-level applications.
🧱 Tech Stack
Frontend
React (Vite)
React Router DOM
Axios
Context API
Tailwind CSS
Backend
Node.js
Express.js
MongoDB (Mongoose)
JSON Web Token (JWT)
bcrypt.js
🔑 Core Features
User Signup & Login
Password Hashing using bcrypt
JWT-based Authentication
Protected Routes & Middleware
Token Storage (LocalStorage)
Clean & Modular Code Structure
📁 Project Structure
AuthApp/
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
⚙️ How Authentication Works
User registers with email & password
Password is hashed before saving to MongoDB
On login, credentials are verified
JWT token is generated and sent to client
Client stores token and accesses protected routes
JWT works like a secure digital access token 🎟️
🛠️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/auth-app-mern.git](https://github.com/Yaqoob-Samoon/auth-app-mern.git 
cd auth-app-mern
2️⃣ Backend Setup
cd backend
npm install
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run backend server:
npm start
Backend runs on:
http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on:
http://localhost:5173

🔐 API Endpoints (Example)
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/profile	Protected user route
📌 Best Practices Used
MVC Architecture
Environment Variables
Secure Password Hashing
JWT & Middleware Authentication
Scalable Folder Structure
🎯 Learning Outcomes
Understanding real-world authentication flows
MERN stack integration
JWT & middleware usage
Secure backend development practices
📷 Screenshots
Add screenshots of Login & Register pages here
📜 License
This project is built for learning and educational purposes.
👨‍💻 Author
Yaqoob Samoon
MERN Stack Developer | Computer Science Student
⭐ If you like this project, consider giving it a star!
