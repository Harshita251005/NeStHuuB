# NestHub - Frontend

A clean, modern and responsive React frontend for browsing, booking and managing PG (Paying Guest) accommodations.
Designed for users and PG owners, built using React 19 + Vite + Tailwind CSS.

## Features

- **User Registration**: Students and professionals can register to find PGs
- **Owner Registration**: Property owners can register to list their PGs
- **PG Listings**: Browse available PGs with location, price, and amenities
- **Booking System**: Users can book PGs directly through the platform
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Simple, solid colors without gradients for better accessibility

## Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Bun package manager

### Installation

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun run dev
```

3. Build for production:
```bash
bun run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   └── LoadingSpinner.jsx
│   ├── EditPGModal.jsx
│   └── PGBookingsModal.jsx
├── pages/              # Page components
│   ├── AddPG.jsx
│   ├── Bookings.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── OwnerDashboard.jsx
│   ├── OwnerLogin.jsx
│   ├── OwnerRegister.jsx
│   ├── PGList.jsx
│   ├── UserLogin.jsx
│   └── UserRegister.jsx
├── configs/            # Configuration files
│   └── api.js
├── utils/              # Utility functions
│   └── helpers.js
├── constants/          # Application constants
│   └── index.js
├── App.jsx             # Main app component
└── main.jsx 
├── index.css          # Entry point
```

## API Integration

The frontend integrates with the backend API running on `http://localhost:5000`. All API calls are configured in `src/configs/api.js`.

### Available Endpoints

- **Users**: Registration and management
- **Owners**: Owner registration and PG management
- **Bookings**: Create and view bookings
- **PGs**: Browse and add PG listings

## Design Philosophy

- **Clean & Simple**: No gradients, using solid colors for better readability
- **Accessible**: High contrast ratios and proper focus states
- **Responsive**: Mobile-first design approach
- **Component-Based**: Modular, reusable components
- **Consistent**: Unified design language throughout the app

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## Contributing

1. Follow the component-based structure
2. Use Tailwind CSS utility classes
3. Maintain consistency with the design system
4. Add proper error handling
5. Include loading states for async operations

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
