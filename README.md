# 🚀 Professional Task Management System

A production-ready Task Management system built for a Backend Developer Internship assignment. This project has been enhanced with professional-grade features to demonstrate senior-level engineering principles.

## ✨ Stand-Out Features
- **Interactive API Documentation:** Integrated **Swagger UI** for easy API testing.
- **Enhanced Security:**
  - **Helmet:** Secure HTTP headers.
  - **XSS Protection:** Sanitization of user input to prevent cross-site scripting.
  - **NoSQL Injection Prevention:** Sanitizing MongoDB queries.
- **Advanced Querying:** Support for **Pagination, Filtering (by status), and Sorting** on the backend.
- **Functional Depth:** Tasks now support **Priority levels** (Low, Medium, High) and **Status toggling**.
- **Modern UX:**
  - **Toast Notifications:** Real-time feedback using `react-hot-toast`.
  - **Loading States:** Smooth user experience during data fetching.
  - **Responsive Design:** Professional, clean UI inspired by modern SaaS applications.
- **Role-Based Access Control (RBAC):** Strict separation between `user` and `admin` capabilities.

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Security:** JWT, bcryptjs, Helmet, XSS-Clean, Mongo-Sanitize
- **Documentation:** Swagger/OpenAPI 3.0
- **Frontend:** React.js, Axios, React-Hot-Toast

---

## 📂 Project Structure
```
/
├── backend/
│   ├── config/          # Database & App config
│   ├── controllers/     # Business logic (Lean controllers)
│   ├── middleware/      # Security, Auth, & Global Error Handling
│   ├── models/          # Mongoose Schemas with Validation
│   ├── routes/          # RESTful routes with Swagger documentation
│   └── server.js        # Server entry point with security middleware
├── frontend/
│   ├── src/
│   │   ├── components/  # Modular UI components
│   │   ├── pages/       # Page-level components
│   │   ├── services/    # Abstracted API & Auth services
│   │   └── App.js       # Global state & Routing
└── README.md            # Comprehensive documentation
```

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local installation

### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```
4. `npm start`
5. **API Documentation:** View and test the API at `http://localhost:5000/api-docs`

### 3. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start`
4. Access the app at `http://localhost:3000`

---

## 📈 Scalability & Future Roadmap
This architecture is designed to scale:
1. **Caching:** Integrate Redis to cache task lists and reduce database hits.
2. **Microservices:** The authentication and task logic can be decoupled into independent services.
3. **Automated Testing:** Expand the project with Jest and Supertest for TDD.
4. **CI/CD:** Deploy via GitHub Actions to AWS or Vercel.

## 🛡 Security Highlights
- **JWT:** Stateless authentication with tokens stored securely in the frontend.
- **Data Sanitization:** Every input is cleaned before reaching the database.
- **RBAC:** Admins have exclusive rights to delete resources, protecting data integrity.
