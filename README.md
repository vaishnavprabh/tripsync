# 🌍 TripSync - Collaborative Trip Planning & Expense Management

> **Simplifying group travel with smart expense splitting, itinerary management, and real-time collaboration**

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8%2B-blue.svg)](https://www.mysql.com/)

## 📖 Table of Contents

- [Overview](#overview)
- [Why TripSync?](#why-tripsync)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**TripSync** is a full-stack web application designed to make group travel planning effortless. Whether you're organizing a weekend getaway or a month-long adventure, TripSync helps you:

- 📋 Create and manage group trips
- 💰 Split expenses intelligently with custom amount allocation
- 📅 Build collaborative itineraries
- 💬 Communicate with trip members in real-time
- 📊 Track payments and settlements
- 🎁 Share announcements and updates
- 📝 Gather feedback from travelers

The application supports multiple user roles (Travelers, Organizers, and Admins) with role-based access control and comprehensive trip management capabilities.

---

## 💡 Why TripSync?

### The Problem
Group trips often involve:
- 🤕 Manual expense tracking and confusing split calculations
- 🗂️ Scattered itineraries across multiple apps and platforms
- 📢 Difficulty coordinating with all participants
- 💸 Unclear payment settlements and who owes what
- 😰 Administrative overhead for trip organizers

### The Solution
TripSync provides a unified platform where:
- ✅ Expenses are automatically split based on participant contribution
- ✅ Itineraries are centralized and accessible to everyone
- ✅ Real-time messaging keeps everyone informed
- ✅ Payment tracking shows exactly who owes what
- ✅ Organizers have complete trip analytics and control

---

## ✨ Key Features

### 1. **Smart Expense Management** 💰
- Create expenses with custom splits per traveler
- Two split modes:
  - **Equal Split**: Automatically divides amount equally
  - **Custom Split**: Set individual amounts for each participant
- Real-time validation ensures total amounts match
- View comprehensive expense breakdown with payment status
- Settlement tracking and payment history

### 2. **Collaborative Trip Planning** 📅
- Create trips with multiple participants
- Build detailed itineraries with activities and timings
- Share important trip information
- Upload and organize trip documents
- View all trip details in one place

### 3. **Real-time Communication** 💬
- Send messages within trip groups
- Share announcements to all participants
- Receive and manage invitations
- Get notifications for important updates
- Admin support and feedback collection

### 4. **Role-Based Access Control** 👥
- **Travelers**: View trip details, expenses, itinerary
- **Organizers**: Create trips, manage expenses, send invitations, create itineraries
- **Admins**: System-wide management, user administration, reports

### 5. **Advanced Features** 🚀
- AI-powered trip suggestions (experimental)
- Skill exchange module
- User ratings and feedback system
- Expense analytics and KPIs
- Export trip reports

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v4.18)
- **Database**: MySQL (v8+)
- **Authentication**: JWT (JSON Web Tokens)
- **Additional**: Multer for file uploads

### Frontend
- **Library**: React (v19)
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI v7)
- **Routing**: React Router (v7)
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Animations**: GSAP
- **Charts**: Recharts

### Database
- MySQL with structured schemas
- Support for relationships and constraints
- Migration support for schema updates

---

## 📁 Project Structure

```
TripSync/
├── Backend/
│   ├── Index.js                 # Main server entry point
│   ├── package.json             # Dependencies
│   ├── config/
│   │   ├── db.js               # Database configuration
│   │   └── jwt.js              # JWT configuration
│   ├── controllers/             # Business logic
│   │   ├── auth.js             # Authentication
│   │   ├── tripController.js   # Trip management
│   │   ├── expenseController.js # Expense handling
│   │   ├── messageController.js # Messaging
│   │   ├── itineraryController.js
│   │   ├── adminController.js
│   │   └── ... (more controllers)
│   ├── routes/                  # API endpoints
│   │   ├── authRoutes.js
│   │   ├── tripRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── ... (more routes)
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── database/
│   │   ├── schema.sql          # Main database schema
│   │   ├── feedback_schema.sql
│   │   └── ... (migration files)
│   └── node_modules/           # Dependencies (gitignored)
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx            # React entry point
│   │   ├── App.jsx             # Main app component
│   │   ├── Components/         # Reusable components
│   │   ├── Modules/            # Feature modules
│   │   │   ├── Traveler/      # Traveler view
│   │   │   ├── Organizer/     # Organizer view
│   │   │   └── Admin/         # Admin panel
│   │   ├── config/            # Configuration
│   │   └── assets/            # Images and assets
│   ├── index.html             # HTML template
│   ├── package.json           # Dependencies
│   ├── vite.config.js         # Vite configuration
│   └── eslint.config.js       # Linting rules
│
├── DB.sql                      # Database initialization script
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher (comes with Node.js)
- **MySQL**: v8 or higher
- **Git**: For version control

### System Requirements
- RAM: Minimum 2GB
- Storage: Minimum 1GB free space
- OS: Windows, macOS, or Linux

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/vaishnavprabh/tripsync.git
cd tripsync
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tripsync
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Database Setup

```bash
mysql -u root -p < ../DB.sql
```

Or manually create the database and run:
```bash
mysql -u root -p tripsync < ../DB.sql
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TripSync
```

---

## ⚙️ Configuration

### Backend Configuration (`Backend/config/db.js`)
```javascript
// Modify database connection settings
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```

### Frontend Configuration (`frontend/src/config/api.js`)
```javascript
// API base URL (auto-configured from .env.local)
const API_URL = import.meta.env.VITE_API_URL;
```

---

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Backend**
```bash
cd Backend
npm start
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Frontend**
```bash
cd frontend
npm run build
npm run preview
```

**Backend**
```bash
cd Backend
node Index.js  # Without nodemon
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips/create` - Create new trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Expenses
- `GET /api/expenses/:tripId` - Get expenses for trip
- `POST /api/expenses/add` - Add new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Itinerary
- `GET /api/itinerary/:tripId` - Get itinerary items
- `POST /api/itinerary/add` - Add itinerary item
- `PUT /api/itinerary/:id` - Update itinerary item
- `DELETE /api/itinerary/:id` - Delete itinerary item

### Messages
- `POST /api/messages/send` - Send message
- `GET /api/messages/:tripId` - Get trip messages

### Announcements
- `POST /api/announcements/send` - Send announcement
- `GET /api/announcements/:tripId` - Get announcements

### Invitations
- `POST /api/invitations/send` - Send invitation
- `GET /api/invitations/user` - Get user invitations
- `POST /api/invitations/:id/accept` - Accept invitation
- `POST /api/invitations/:id/reject` - Reject invitation

---

## 🗄️ Database Schema

### Main Tables
- **users** - User accounts and profiles
- **trips** - Trip information
- **trip_members** - Trip participant relationships
- **expenses** - Trip expenses
- **expense_splits** - Individual expense splits per person
- **itinerary** - Trip itinerary items
- **messages** - In-trip messaging
- **announcements** - Trip announcements
- **invitations** - Trip invitations
- **feedback** - User feedback

### Key Features
- Foreign key relationships for data integrity
- Proper indexing for performance
- Timestamps for audit trails
- Status fields for workflow tracking

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes before submitting
- Update documentation as needed
- Keep commits atomic and well-described

---

## 🐛 Troubleshooting

### Backend Issues

**Port already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**Database connection failed**
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database `tripsync` exists

### Frontend Issues

**Port 5173 not available**
```bash
npm run dev -- --port 3000
```

**Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📧 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/vaishnavprabh/tripsync/issues)
- Create a [Discussion](https://github.com/vaishnavprabh/tripsync/discussions)

---

## 🙏 Acknowledgments

- Built with React, Node.js, and MySQL
- UI powered by Material-UI
- Inspired by real-world group travel challenges

---

## 🚀 Roadmap

- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration
- [ ] AI-powered trip recommendations
- [ ] Social features and trip sharing
- [ ] Multi-currency support
- [ ] Calendar integration

---

**Made with ❤️ for better group travel experiences**
