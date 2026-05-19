import { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';
import { bookingAPI } from '../configs/api';

const PGBookingsModal = ({ pg, isOpen, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && pg) {
      fetchPGBookings();
    }
  }, [isOpen, pg]);

  const fetchPGBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await bookingAPI.getByPG(pg.id);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching PG bookings:', error);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Bookings for {pg?.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 inline mr-1" />
              {pg?.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading bookings...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={fetchPGBookings}
                className="btn-primary mt-4"
              >
                Try Again
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Yet</h3>
              <p className="text-gray-600">This PG hasn't received any bookings yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Bookings: <span className="text-blue-600">{bookings.length}</span>
                </h3>
              </div>

              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <User className="h-5 w-5 text-blue-600 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-900">
                            {booking.user_name}
                          </h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{booking.user_email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{booking.user_phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-0 md:ml-6">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium text-center">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Booked on {formatDate(booking.booking_date)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-secondary w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGBookingsModal;