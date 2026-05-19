import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../configs/api';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, User, Building, MapPin, CheckCircle, Clock } from 'lucide-react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, userType, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate('/user/login');
      return;
    }
    
    fetchBookings();
  }, [user, authLoading, navigate]);

  const fetchBookings = async () => {
    if (!user) return;
    
    try {
      let response;
      if (userType === 'owner') {
        response = await bookingAPI.getByOwner(user.id);
      } else {
        response = await bookingAPI.getByUser(user.id);
      }
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#09090b] dark:to-[#09090b] transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-200 border-t-sky-600 dark:border-sky-900 dark:border-t-sky-400 mx-auto"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#09090b] dark:to-[#09090b] transition-colors duration-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">My Bookings</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Track all your PG booking history</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-center font-medium">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-transparent dark:border-white/5">
              <Calendar className="h-10 w-10 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Bookings Yet</p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Start exploring and book your perfect PG today!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="card-hover group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 p-3 rounded-xl flex-shrink-0 border border-transparent dark:border-sky-500/20">
                        <Calendar className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-bold text-sky-600 dark:text-sky-400">Booking ID: #{booking.id}</span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-transparent dark:border-emerald-500/20 rounded-full text-xs font-semibold">
                            <CheckCircle className="h-3 w-3" />
                            Confirmed
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <User className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <span className="text-sm">
                              <strong className="dark:text-white">User:</strong> {booking.user_name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <Building className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <span className="text-sm">
                              <strong className="dark:text-white">PG:</strong> {booking.pg_name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <span className="text-sm">
                              <strong className="dark:text-white">Location:</strong> {booking.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="md:text-right">
                    <div className="flex items-center gap-2 md:justify-end mb-3">
                      <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(booking.booking_date)}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-transparent dark:border-sky-800/30 rounded-lg font-semibold hover:bg-sky-100 dark:hover:bg-sky-900/50 transition duration-200 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {bookings.length > 0 && (
          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Booking Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">{bookings.length}</div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Total Bookings</p>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{bookings.length}</div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Confirmed</p>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {new Set(bookings.map(b => b.pg_name)).size}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Unique PGs</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;