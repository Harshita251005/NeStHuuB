// Application constants

export const API_ENDPOINTS = {
  USERS: '/users',
  OWNERS: '/owners',
  BOOKINGS: '/bookings',
  PGS: '/owners/pgs'
};

export const ROUTES = {
  HOME: '/',
  USER_REGISTER: '/user/register',
  OWNER_REGISTER: '/owner/register',
  PGS: '/pgs',
  ADD_PG: '/add-pg',
  BOOKINGS: '/bookings'
};

export const MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful!',
  REGISTRATION_ERROR: 'Registration failed. Please try again.',
  PG_ADDED_SUCCESS: 'PG added successfully!',
  PG_ADDED_ERROR: 'Failed to add PG. Please try again.',
  BOOKING_SUCCESS: 'Booking successful!',
  BOOKING_ERROR: 'Booking failed. Please try again.',
  LOADING: 'Loading...',
  NO_DATA: 'No data available',
  NETWORK_ERROR: 'Network error. Please check your connection.'
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PG_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500
};