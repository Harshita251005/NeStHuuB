# NestHub (formerly FindMyPG) - Setup & Overview

NestHub is a modern PG (Paying Guest) listing and booking platform. This repository contains a Node.js + Express backend and a React + Vite frontend (Tailwind CSS) with features for both users and PG owners.

## 🚀 Features

### For Users
- **User Registration & Login** - Create account and sign in
- **Browse PGs** - View available PG listings with images and details
- **Book PGs** - Book accommodations directly through the platform
- **View Bookings** - See all booking history

### For Owners
- **Owner Registration & Login** - Register as a PG owner
- **Owner Dashboard** - Manage your PG listings and view statistics
- **Add PGs** - List new PG properties with detailed descriptions and an optional image upload (client sends image as base64)
- **Manage Properties** - Edit and delete your PG listings

### General Features
- **Responsive Design** - Mobile, tablet and desktop friendly
- **Dark Mode** - User-toggleable dark theme with preference persistence
- **Image Upload** - Owners can upload a PG image during listing (client includes base64 image in payload)
- **Accessible UI** - Improved contrast and focus states for better readability
- **Secure Authentication** - Password hashing and secure login

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling (class-based dark mode)
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📦 Installation

### Prerequisites
- Node.js (v18 or later)
- MySQL (v8.0 or later)
- npm or Bun (both supported; examples below use `npm`)

### Backend Setup

1. Navigate to the server directory:
```powershell
cd server
```

2. Install dependencies (npm example):
```powershell
npm install
```

3. Create a `.env` file in `server/` with your DB credentials, for example:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=findmypg
```

4. Create the database and tables:
```powershell
# Run the SQL file to create schema
mysql -u root -p < sql/db.sql
```

5. Start the server:
```powershell
npm start
```

### Frontend Setup

1. Navigate to the client directory:
```powershell
cd client
```

2. Install dependencies (npm example):
```powershell
npm install
```

3. Start development server:
```powershell
npm run dev
```

4. Open the app in the browser at `http://localhost:5173` (default Vite port)

## 🗄️ Database Schema

### Tables
- **users** - User accounts and profiles
- **owners** - PG owner accounts
- **pgs** - PG property listings
- **bookings** - User bookings and reservations

## 📱 Usage

### For Users
1. **Register/Login** - Create account or sign in
2. **Browse PGs** - View available accommodations
3. **Book PG** - Select and book your preferred PG
4. **View Bookings** - Check your booking history

### For Owners
1. **Register/Login** - Create owner account
2. **Dashboard** - View your PG statistics
3. **Add PGs** - List new properties
4. **Manage** - Edit or delete listings

### API Endpoints

User Routes (`/api/users`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /` - Get all users

Owner Routes (`/api/owners`)
- `POST /register` - Owner registration
- `POST /login` - Owner login
- `POST /pg` - Add new PG (frontend may include a base64 `image` field)
- `GET /pgs` - Get all PGs
- `GET /:ownerId/pgs` - Get owner's PGs
- `GET /` - Get all owners

Booking Routes (`/api/bookings`)
- `POST /` - Create booking
- `GET /` - Get all bookings

## 🎨 Design & UX Notes

- The UI has been refreshed and rebranded to **NestHub**.
- A class-based Tailwind dark mode is available and toggleable from the header; the user's theme preference is persisted to `localStorage`.
- Owner image upload is supported in the Add PG form; the client converts selected images to base64 and includes them in the PG payload. The backend was intentionally not changed — if you want server-side image storage later, adapt the server to accept and persist uploaded images or accept multipart uploads.
- Accessibility improvements: improved contrast in dark mode, clearer focus states, and responsive layouts for mobile, tablet, and desktop.


## 🆘 Support

For support, create an issue in the repository.

---

**Happy Nesting! 🏠**