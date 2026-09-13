# Mini Appointment Booking Application

A clean, responsive, and functional Full-Stack Appointment Booking application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and styled with **Tailwind CSS**. Developed as part of the technical evaluation for the Full Stack Developer role at **Clinic Living Plus**.

## 🚀 Live Links
- **Frontend Deployment:** [Insert Live Vercel Link Here]
- **Backend API Server:** [Insert Live Render Link Here]

---

## 🛠️ Technology Stack

### Frontend
- **React.js (Vite):** Fast, modern single-page application framework.
- **Tailwind CSS:** Professional utility-first CSS styling framework ensuring cross-device responsiveness.
- **Axios:** For making clean, asynchronous HTTP API requests to the backend server.

### Backend & Database
- **Node.js & Express.js:** Robust architectural runtime and micro-framework for building the RESTful API endpoints.
- **MongoDB Atlas:** Cloud-hosted NoSQL database used to ensure asynchronous operational state persistence across browser refreshes.
- **Mongoose:** Object Data Modeling (ODM) library used to structure schema parameters and maintain strict validation criteria.

---

## 📦 Features Implemented
1. **Interactive Appointment Form:** Responsive form layouts, built-in custom validation constraints (restricting input strictly to a 10-digit mobile phone format using regex controls), and active visual status banners.
2. **Dynamic Appointment Dashboard:** A clean, data-driven table view tracking patients, mobile numbers, selected specialist medical practitioners, and requested times slots.
3. **Operational Action Controls:** Inline workflow execution actions enabling administrators to seamlessly mark instances as `Completed`, `Cancelled`, or completely `Delete` records dynamically with real-time state hydration.

---

## 📂 Project Architecture

```text
Appointment-Booking-App/
├── client/          # Frontend React.js configuration (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppointmentForm.jsx
│   │   │   └── AppointmentList.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── server/          # Backend Express.js Server & Database configuration
    ├── models/
    │   └── Appointment.js
    ├── routes/
    │   └── appointments.js
    ├── server.js
    └── package.json
```

---

## 💻 Local Installation & Setup

Follow these simple sequential steps to get the environment running locally:

### 1. Clone the Repository
```bash
git clone https://github.com
cd Appointment-Booking-App
```

### 2. Configure Backend Server (`server/`)
Navigate to the server directory, install modules, and set up your environment variables:
```bash
cd server
npm install
```
Create a `.env` file inside the `server/` directory and configure the variables:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```
Start the development server:
```bash
npm start
```

### 3. Configure Frontend Client (`client/`)
Open a new terminal tab, navigate to the client directory, install modules, and fire up Vite:
```bash
cd client
npm install
npm run dev
```

---

## 🛡️ API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/appointments` | Creates a new medical appointment record |
| **GET** | `/api/appointments` | Fetches all stored appointments sorted by latest registration date |
| **PATCH** | `/api/appointments/:id` | Modifies appointment lifecycle states (`Completed` / `Cancelled`) |
| **DELETE**| `/api/appointments/:id` | Erases an appointment instance from the database clusters |
