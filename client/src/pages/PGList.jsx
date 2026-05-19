import { useState, useEffect } from 'react';
import { ownerAPI, bookingAPI } from '../configs/api';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, DollarSign, Calendar, Search, Filter, Heart, Share2, Star, Wifi, Zap, Users } from 'lucide-react';

const PGList = () => {
  const [pgs, setPGs] = useState([]);
  const [filteredPgs, setFilteredPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { user, userType } = useAuth();

  useEffect(() => {
    fetchPGs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, maxPrice, pgs]);

  const fetchPGs = async () => {
    try {
      const response = await ownerAPI.getAllPGs();
      setPGs(response.data);
    } catch (error) {
      console.error('Error fetching PGs:', error);
      setMessage('Failed to load PGs');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = pgs;

    if (searchTerm) {
      filtered = filtered.filter(pg =>
        pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pg.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(pg => pg.price <= parseFloat(maxPrice));
    }

    setFilteredPgs(filtered);
  };

  const handleBooking = async (pgId) => {
    if (!user || userType !== 'user') {
      setMessage('Please login as a user to book PGs.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    setBookingLoading(pgId);
    
    try {
      await bookingAPI.create({
        user_id: user.id,
        pg_id: pgId
      });
      setMessage('Booking successful!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.error || 'Booking failed. Please try again.';
      setMessage(errorMessage);
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setBookingLoading(null);
    }
  };

  const toggleFavorite = (pgId) => {
    setFavorites(prev => 
      prev.includes(pgId) 
        ? prev.filter(id => id !== pgId)
        : [...prev, pgId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-200 dark:border-sky-700 border-t-sky-600 dark:border-t-sky-400 mx-auto"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">Loading amazing PGs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Available PGs</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Discover {pgs.length} verified paying guest accommodations</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-dark-soft p-6 space-y-4 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by PG name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Price (₹/month)</label>
                <input
                  type="number"
                  placeholder="Set budget..."
                  value={maxPrice || ''}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="input-field w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap pt-2">
              <button
                onClick={() => { setSearchTerm(''); setMaxPrice(null); }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
              >
                Clear Filters
              </button>
              <span className="px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900 dark:bg-opacity-30 rounded-lg">
                Showing {filteredPgs.length} results
              </span>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-center font-medium animate-slide-up ${
            message.includes('successful') 
              ? 'bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700' 
              : 'bg-red-100 dark:bg-red-900 dark:bg-opacity-40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Empty State */}
        {filteredPgs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No PGs Found</p>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPgs.map((pg) => (
              <div key={pg.id} className="card-hover group overflow-hidden dark:bg-gray-800">
                {/* Card Header with Image or Placeholder */}
                <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 h-48 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {pg.image ? (
                    <img src={pg.image} alt={pg.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl opacity-20">🏢</div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => toggleFavorite(pg.id)}
                      className={`p-2 rounded-full transition duration-200 ${
                        favorites.includes(pg.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                  {pg.rating && (
                    <div className="absolute top-3 left-3 bg-white dark:bg-gray-700 px-3 py-1 rounded-full flex items-center gap-1 shadow-soft dark:shadow-dark-soft">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm text-gray-700 dark:text-gray-200">{pg.rating}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition duration-200 line-clamp-2">
                      {pg.name}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2 gap-2">
                      <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                      <span className="text-sm font-medium line-clamp-1">{pg.location}</span>
                    </div>
                  </div>

                  {pg.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {pg.description}
                    </p>
                  )}

                  {/* Amenities */}
                  <div className="flex gap-3 flex-wrap pt-2">
                    <div className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                      <Wifi className="h-3 w-3" />
                      <span>WiFi</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                      <Zap className="h-3 w-3" />
                      <span>Power</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-pink-50 dark:bg-pink-900 dark:bg-opacity-30 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full">
                      <Users className="h-3 w-3" />
                      <span>Shared</span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Price per Month</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{pg.price}</p>
                      </div>
                      <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition duration-200">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleBooking(pg.id)}
                      disabled={bookingLoading === pg.id}
                      className={`w-full btn-primary flex items-center justify-center gap-2 py-2.5 font-semibold ${
                        bookingLoading === pg.id ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                    >
                      <Calendar className="h-5 w-5" />
                      {bookingLoading === pg.id ? 'Booking...' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PGList;