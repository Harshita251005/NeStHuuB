# 🏠 NestHub - PG Listing & Booking Platform

NestHub is a modern, full-featured Paying Guest (PG) accommodation listing and booking platform built with **React 19 + Vite** (frontend) and **Node.js + Express** (backend). The platform enables users to discover and book PG properties while owners can list and manage their accommodations with secure role-based access control.

## 🎯 Project Overview

NestHub is a two-sided marketplace connecting PG seekers with property owners:
- **Users**: Browse, search, and book PG accommodations
- **Owners**: List properties, manage bookings, and view occupancy analytics
- **Security**: Role-based authorization, ownership verification, booking privacy

---

## ✨ Features

### 👥 User Features
- **Authentication**
  - Secure registration and login with bcrypt password hashing
  - Session-based authentication with localStorage persistence
  - Auto-redirect to login for protected pages
  
- **PG Discovery & Browsing**
  - View all available PG listings with images, descriptions, and pricing
  - Search PGs by name and location
  - Filter by price range (max price filter)
  - View full property details including amenities and owner contact info
  - Responsive gallery with image display

- **Booking Management**
  - Book PG accommodations with date selection
  - View complete booking history (secured - users only see their own bookings)
  - Real-time booking status tracking
  - Booking details with property and date information

- **UI/UX**
  - Dark mode toggle with persistent preference storage
  - Responsive design (mobile, tablet, desktop)
  - Smooth loading states and error handling
  - Accessible components with proper contrast and focus states

### 🏢 Owner Features
- **Authentication**
  - Dedicated owner registration and login
  - Secure credential management

- **Dashboard**
  - Personal dashboard showing all owned PGs
  - View statistics and booking information
  - Add, edit, and delete PG properties
  - Only see own properties (owner isolation enforced at API level)

- **Property Management**
  - Add new PGs with:
    - Property name, location, and description
    - Monthly pricing
    - Image upload (converted to base64)
  - Edit property details including images
  - Delete properties from marketplace
  - Ownership verification prevents unauthorized modifications

- **Booking Oversight**
  - View all bookings on own PGs (cannot see other owners' bookings)
  - Interactive booking modal with detailed tenant information
  - Track occupancy and generate revenue insights

### 🔒 Security & Authorization

#### User-Level Authorization
- Users can only see their own bookings
- Users cannot access other users' booking data
- Unauthenticated access redirected to login

#### Owner-Level Authorization
- Owners can only view their own PG listings
- Owners can only edit/delete their own properties (API-enforced)
- Owners can only see bookings for their own PGs
- Ownership verification checks prevent cross-owner modifications
- Returns 403 Forbidden if unauthorized ownership detected

#### API Security
- All protected endpoints verify user identity and ownership
- Database queries scoped to authenticated user
- Role-based access (users vs owners)
- Secure password hashing with bcrypt

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library & component framework | 19.2.0 |
| **Vite** | Build tool & dev server | 7.2.2 |
| **React Router** | Client-side routing & navigation | 7.9.5 |
| **Tailwind CSS** | Utility-first CSS styling & dark mode | 3.4.18 |
| **Axios** | HTTP client for API requests | 1.13.2 |
| **Lucide React** | Icon library | 0.553.0 |
| **Context API** | State management (Auth, Theme) | Built-in |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | JavaScript runtime | v18+ |
| **Express.js** | Web framework & routing | Latest |
| **MySQL** | Relational database | 8.0+ |
| **bcryptjs** | Password hashing & security | Latest |
| **CORS** | Cross-origin resource sharing | Latest |

### Database
- **MySQL** with information_schema for safe migrations
- Automatic schema creation on startup
- Relational design with foreign keys for data integrity

---

## 📁 Project Structure

```
NestHub/
├── server/                          # Backend (Node.js + Express)
│   ├── index.js                    # Main server entry point
│   ├── package.json                # Backend dependencies
│   ├── configs/
│   │   └── db.js                   # MySQL connection & auto-migration
│   ├── routes/
│   │   ├── userRoutes.js           # User registration, login
│   │   ├── ownerRoutes.js          # Owner auth, PG CRUD with ownership verification
│   │   └── bookingRoutes.js        # Booking creation & role-based retrieval
│   └── sql/
│       └── db.sql                  # Database schema definition
│
├── client/                          # Frontend (React + Vite)
│   ├── index.html                  # HTML entry point
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config (dark mode)
│   ├── eslint.config.js            # Code linting rules
│   ├── src/
│   │   ├── main.jsx                # React app entry
│   │   ├── App.jsx                 # Main app router
│   │   ├── index.css               # Global styles
│   │   ├── configs/
│   │   │   └── api.js              # Centralized API endpoint definitions
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx     # Authentication state & user/owner data
│   │   │   └── ThemeContext.jsx    # Dark mode preference management
│   │   ├── components/
│   │   │   ├── Header.jsx          # Navigation & dark mode toggle
│   │   │   ├── LoadingSpinner.jsx  # Reusable loading component
│   │   │   ├── EditPGModal.jsx     # PG editing modal for owners
│   │   │   └── PGBookingsModal.jsx # Booking details modal
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── UserLogin.jsx       # User login page
│   │   │   ├── UserRegister.jsx    # User registration page
│   │   │   ├── OwnerLogin.jsx      # Owner login page
│   │   │   ├── OwnerRegister.jsx   # Owner registration page
│   │   │   ├── PGList.jsx          # Browse all PGs (marketplace)
│   │   │   ├── AddPG.jsx           # Add new PG property (owner only)
│   │   │   ├── OwnerDashboard.jsx  # Owner's personal dashboard
│   │   │   ├── Bookings.jsx        # User/owner bookings view
│   │   │   └── NotFound.jsx        # 404 error page
│   │   ├── utils/
│   │   │   └── helpers.js          # Utility functions
│   │   ├── constants/
│   │   │   └── index.js            # App constants
│   │   └── assets/                 # Images & static files
│   └── public/                     # Public static assets
│
└── README.md                        # This file
```

---

## 🗄️ Database Schema

### users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Purpose**: Stores regular user accounts for browsing and booking

### owners
```sql
CREATE TABLE owners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Purpose**: Stores owner accounts for listing and managing properties

### pgs
```sql
CREATE TABLE pgs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT,
  name VARCHAR(255),
  location VARCHAR(255),
  price DECIMAL(10, 2),
  description TEXT,
  image MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);
```
**Purpose**: Stores PG property listings with owner reference and base64 image

### bookings
```sql
CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  pg_id INT,
  booking_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pg_id) REFERENCES pgs(id)
);
```
**Purpose**: Stores booking records linking users to PG properties

---

## 🔌 API Endpoints

### User Routes (`/api/users`)
| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| `POST` | `/register` | Register new user account | None |
| `POST` | `/login` | Authenticate user | None |
| `GET` | `/` | Get all users | None |

### Owner Routes (`/api/owners`)
| Method | Endpoint | Purpose | Auth | Notes |
|--------|----------|---------|------|-------|
| `POST` | `/register` | Register owner account | None | - |
| `POST` | `/login` | Authenticate owner | None | - |
| `POST` | `/pg` | Add new PG property | Owner | Includes image (base64) |
| `PUT` | `/pg/:pgId` | Update PG details | Owner | **Verifies ownership** |
| `DELETE` | `/pg/:pgId` | Delete PG property | Owner | **Verifies ownership** |
| `GET` | `/pgs` | Get all PGs (marketplace) | None | Returns all owners' PGs |
| `GET` | `/:ownerId/pgs` | Get owner's PGs | None | Returns only specified owner's PGs |
| `GET` | `/` | Get all owners | None | - |

**Authorization**: PUT/DELETE endpoints verify `owner_id` in request body matches database owner

### Booking Routes (`/api/bookings`)
| Method | Endpoint | Purpose | Auth | Returns |
|--------|----------|---------|------|---------|
| `POST` | `/` | Create booking | User | New booking record |
| `GET` | `/` | Get all bookings | None | Empty array (security) |
| `GET` | `/user/:userId` | Get user's bookings | User | Bookings for specific user only |
| `GET` | `/owner/:ownerId` | Get owner's bookings | Owner | All bookings on owner's PGs |
| `GET` | `/pg/:pgId` | Get PG's bookings | Any | Bookings for specific property |

**Authorization**: User endpoints return only authenticated user's data; owner endpoints return only own PGs' bookings

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v18 or later
- **MySQL** v8.0 or later
- **npm** or **Bun** package manager

### Backend Setup

1. **Install dependencies** (from root directory):
```bash
npm install
```

2. **Navigate to server directory**:
```bash
cd server
```

3. **Install backend dependencies**:
```bash
npm install
```

4. **Create `.env` file** in `server/` with database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nesthub
```

5. **Create database and tables**:
```bash
mysql -u root -p < sql/db.sql
```

6. **Start server** (auto-migrates schema on startup):
```bash
npm start
```
Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**:
```bash
cd client
```

2. **Install frontend dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```
App runs on `http://localhost:5173`

4. **Build for production**:
```bash
npm run build
```
Builds optimized bundle in `dist/` folder

---

## 💻 Usage Guide

### For Users

**1. Create Account**
- Navigate to `/user/register`
- Enter name, email, phone, and password
- Submit to create account

**2. Browse PGs**
- Visit `/pg-list` (public marketplace)
- Search by PG name or location
- Filter by maximum price
- View property details with images and amenities

**3. Book Accommodation**
- Click "Book Now" on desired property
- Confirm booking (date auto-filled)
- View confirmation

**4. View Bookings**
- Navigate to `/bookings` (requires login)
- See all your booking history
- View booking dates and property details

### For Owners

**1. Create Owner Account**
- Navigate to `/owner/register`
- Enter business details and credentials
- Confirm registration

**2. Access Dashboard**
- Login at `/owner/login`
- Redirects to owner dashboard (`/owner-dashboard`)

**3. List New Property**
- Click "Add New PG" button
- Fill in:
  - Property name
  - Location
  - Monthly price
  - Description/amenities
  - Optional image upload
- Submit to list property

**4. Manage Properties**
- View all your listed PGs
- **Edit**: Click pencil icon → Update details
- **Delete**: Click trash icon → Confirm deletion
- Only see your own properties (ownership verified at API)

**5. View Bookings**
- Click "View Bookings" on any property
- See all bookings for that specific PG
- Only see bookings for your own properties

---

## 🔐 Security Features

### Authentication
- ✅ Bcrypt password hashing (10 salt rounds)
- ✅ Session-based auth with localStorage tokens
- ✅ Role separation (users vs owners)
- ✅ Automatic login redirect for protected pages

### Authorization
- ✅ User data isolation (users only see own bookings)
- ✅ Owner data isolation (owners only manage own PGs)
- ✅ Booking visibility restricted by role
- ✅ API-level ownership verification (403 Forbidden on unauthorized access)

### Data Protection
- ✅ SQL parameter binding (prepared statements)
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation on all forms
- ✅ Secure session handling

---

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Flexible grid layouts
- Touch-friendly buttons and interactive elements

### Dark Mode
- Class-based Tailwind CSS dark mode
- Toggle button in header
- Preference persisted to `localStorage`
- Automatic dark mode detection (optional enhancement)

### Visual Design
- Clean, modern interface with cards
- Gradient backgrounds and smooth transitions
- Consistent color scheme (sky/blue theme)
- Icon-enhanced navigation

### Accessibility
- Proper heading hierarchy
- ARIA labels where needed
- High contrast in dark mode
- Keyboard navigation support
- Focus states on interactive elements

---

## 🔄 Frontend Features In Detail

### Context Providers (State Management)
- **AuthContext**: Manages login state, user/owner data, logout
- **ThemeContext**: Manages dark mode preference

### Key Components
- **Header**: Navigation, dark mode toggle, auth state display
- **EditPGModal**: Modal form for editing property details
- **PGBookingsModal**: Modal showing bookings for selected property
- **LoadingSpinner**: Reusable loading indicator

### Pages & Their Functions
| Page | Path | Purpose | Auth Required |
|------|------|---------|----------------|
| Home | `/` | Landing page with intro | No |
| User Login | `/user/login` | User authentication | No |
| User Register | `/user/register` | New user signup | No |
| PG List | `/pg-list` | Browse all properties | No |
| Owner Login | `/owner/login` | Owner authentication | No |
| Owner Register | `/owner/register` | Owner signup | No |
| Add PG | `/add-pg` | List new property | Owner only |
| Owner Dashboard | `/owner-dashboard` | Manage properties | Owner only |
| Bookings | `/bookings` | View own bookings | User/Owner |
| Not Found | `/*` | 404 error page | No |

---

## 🔧 Backend Features In Detail

### Routes & Their Functions

**User Routes** (`routes/userRoutes.js`)
- Registration with email validation
- Secure login with bcrypt comparison
- User listing endpoint

**Owner Routes** (`routes/ownerRoutes.js`)
- Owner registration and authentication
- PG CRUD operations with image support
- Ownership verification on update/delete
- Scoped PG retrieval (all PGs, or by owner)

**Booking Routes** (`routes/bookingRoutes.js`)
- Create booking with user/PG association
- User-scoped booking retrieval
- Owner-scoped booking retrieval (joins with pgs table)
- Property-scoped booking retrieval

### Database Management
- **Auto-migration** on startup using information_schema queries
- **Safe schema creation** (checks before ALTER TABLE)
- **Relational integrity** with foreign keys
- **Base64 image storage** in MEDIUMTEXT columns

---

## 📊 Data Flow

### Booking Flow
```
User Views PG List
    ↓
User Clicks "Book Now"
    ↓
POST /api/bookings (creates booking record)
    ↓
User Redirected to /bookings
    ↓
GET /api/bookings/user/:userId (retrieves user's bookings)
    ↓
Owner Sees Booking in Dashboard
    ↓
GET /api/bookings/owner/:ownerId (retrieves owner's PGs' bookings)
```

### Property Management Flow
```
Owner Adds PG
    ↓
POST /api/owners/pg (includes base64 image)
    ↓
GET /api/owners/:ownerId/pgs (fetch owner's properties)
    ↓
Owner Edits PG
    ↓
PUT /api/owners/pg/:pgId (verified ownership → 403 if unauthorized)
    ↓
Owner or User Deletes PG
    ↓
DELETE /api/owners/pg/:pgId (verified ownership → 403 if unauthorized)
```

---

## 🐛 Debugging & Support

### Common Issues

**Port Already in Use**
```bash
# Change PORT in server/.env or use different port
PORT=5001
```

**Database Connection Failed**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database name matches DB_NAME

**CORS Errors**
- Ensure server is running on port 5000
- Check frontend API_BASE_URL in `client/src/configs/api.js`

**Images Not Showing**
- Base64 images are converted on client before upload
- Check browser console for errors
- Verify MEDIUMTEXT column exists in pgs table

### Logs
- **Server logs** show SQL queries and connection status
- **Browser console** shows API request/response errors
- **Network tab** shows HTTP requests and responses

---

## 📝 Recent Updates

### v1.0 Features Implemented
- ✅ Complete user & owner authentication system
- ✅ PG listing with image upload (base64)
- ✅ Booking management with role-based filtering
- ✅ Owner dashboard with isolation (can't see other owners' PGs)
- ✅ Booking privacy (users only see own bookings, owners only see own PGs' bookings)
- ✅ Dark mode with persistence
- ✅ Responsive mobile-first design
- ✅ API-level authorization checks (ownership verification)

---

## 🚀 Future Enhancements

- Payment gateway integration (Stripe/Razorpay)
- User reviews and ratings
- Admin dashboard for platform management
- Email notifications for bookings
- Advanced filtering (amenities, room type, etc.)
- Calendar-based availability management
- Wishlist/favorites feature
- Real-time notifications using WebSockets

---


## 📧 Support & Contact

For issues, bugs, or feature requests, please create an issue in the repository.

---

**Happy Nesting! 🏠** ✨

Built with ❤️ using React, Express, and MySQL