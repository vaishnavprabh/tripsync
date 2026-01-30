# TripSync Database Setup Instructions

## 1. Create Database and Tables

Run the SQL script to create the database and tables:

```bash
mysql -u root -p < Backend/database/tripsync_schema.sql
```

Or manually execute the SQL commands:

1. Open MySQL command line or MySQL Workbench
2. Run the commands from `tripsync_schema.sql` or `DB.sql`

## 2. Database Structure

### Admin Table
- `id` - Primary key (auto increment)
- `email` - Admin email (unique)
- `password` - Admin password
- `name` - Admin name (optional)
- `created_at` - Timestamp
- `updated_at` - Timestamp

**Default Admin Credentials:**
- Email: `admin@tripsync.com`
- Password: `admin123`

### Users Table (Travelers and Organizers)
- `id` - Primary key (auto increment)
- `username` - User's full name
- `email` - User's email (unique)
- `number` - Phone number
- `password` - User password
- `role` - User role: `'traveler'` or `'organizer'` (default: 'traveler')
- `created_at` - Timestamp
- `updated_at` - Timestamp

## 3. Update Database Configuration

Edit `Backend/config/db.js` with your MySQL credentials:

```javascript
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'tripsync'
})
```

## 4. User Roles

### Traveler
- Can join trips through invitations
- Can view trip plans and updates
- Can suggest ideas and vote on destinations
- Can share budget or preferences
- Can participate in group discussions
- Can use expense tracker

### Organizer
- Can create and manage trips
- Can add trip details (date, place, itinerary)
- Can send invitations to travelers
- Can track who is joining the trip
- Can share updates and announcements
- Can manage trip expenses and group communication

### Admin
- Controls and manages the whole system
- Handles user accounts and trip data
- Keeps the platform secure and running smoothly
- Solves technical issues and manages feedback
- Ensures all information is correct and up to date

## 5. Test the Connection

Start the backend server:
```bash
cd Backend
npm start
```

The server should connect to the database successfully.

## 6. API Endpoints

### Authentication
- `POST /api/auth/AdminLogin` - Admin login
- `POST /api/auth/userLogin` - Traveler login
- `POST /api/auth/organizerLogin` - Organizer login

### User Management
- `POST /api/add/addusers` - Register new user (traveler or organizer)
- `GET /api/get/getAllUsers` - Get all users
- `PUT /api/update/updateUser` - Update user
- `DELETE /api/delete/deleteUser` - Delete user

## 7. Registration Request Format

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "role": "traveler" // or "organizer"
}
```

## 8. Login Request Format

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
