import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ownerAPI } from '../configs/api';
import { useAuth } from '../contexts/AuthContext';
import EditPGModal from '../components/EditPGModal';
import PGBookingsModal from '../components/PGBookingsModal';
import { Building, Plus, MapPin, DollarSign, Edit, Trash2, Calendar, Eye } from 'lucide-react';

const OwnerDashboard = () => {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [selectedPG, setSelectedPG] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user, userType, logout, loading: authLoading } = useAuth();

  useEffect(() => {
    
    if(authLoading) return;
    
    if (!user || userType !== 'owner') {
      navigate('/owner/login');
      return;
    }
    
    fetchOwnerPGs(user.id);
  }, [user, userType, navigate, authLoading]);

  const fetchOwnerPGs = async (ownerId) => {
    try {
      const response = await ownerAPI.getOwnerPGs(ownerId);
      setPGs(response.data);
    } catch (error) {
      console.error('Error fetching PGs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditPG = (pg) => {
    setSelectedPG(pg);
    setEditModalOpen(true);
  };

  const handleViewBookings = (pg) => {
    setSelectedPG(pg);
    setBookingsModalOpen(true);
  };

  const handleUpdatePG = async (pgId, pgData) => {
    try {
      await ownerAPI.updatePG(pgId, pgData);
      setMessage('PG updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      // Refresh PGs list
      fetchOwnerPGs(user.id);
    } catch (error) {
      console.error('Error updating PG:', error);
      setMessage('Failed to update PG. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeletePG = async (pgId) => {
    if (window.confirm('Are you sure you want to delete this PG? This action cannot be undone.')) {
      try {
        await ownerAPI.deletePG(pgId, user.id);
        setMessage('PG deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        // Refresh PGs list
        fetchOwnerPGs(user.id);
      } catch (error) {
        console.error('Error deleting PG:', error);
        setMessage('Failed to delete PG. Please try again.');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-md shadow-sm border ${
            message.includes('successfully') 
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your PG listings and bookings</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link 
                to="/add-pg"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center transition-colors shadow-soft"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New PG
              </Link>
              <button 
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400">
                <Building className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total PGs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pgs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Rent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{pgs.length > 0 ? Math.round(pgs.reduce((sum, pg) => sum + parseFloat(pg.price), 0) / pgs.length) : 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Locations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(pgs.map(pg => pg.location)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PG Listings */}
        <div className="card !p-0">
          <div className="p-6 border-b border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your PG Listings</h2>
          </div>
          
          {pgs.length === 0 ? (
            <div className="p-12 text-center">
              <Building className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No PGs Listed Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Start by adding your first PG listing</p>
              <Link 
                to="/add-pg"
                className="btn-primary inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First PG
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {pgs.map((pg) => (
                <div key={pg.id} className="p-6 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {pg.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
                          {pg.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
                          ₹{pg.price}/month
                        </div>
                      </div>
                      {pg.description && (
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{pg.description}</p>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleViewBookings(pg)}
                        className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg text-sm flex items-center transition duration-200 border border-transparent dark:border-blue-800/30"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Bookings
                      </button>
                      <button 
                        onClick={() => handleEditPG(pg)}
                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm flex items-center transition duration-200 border border-transparent dark:border-gray-700"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeletePG(pg.id)}
                        className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm flex items-center transition duration-200 border border-transparent dark:border-red-800/30"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit PG Modal */}
        <EditPGModal
          pg={selectedPG}
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedPG(null);
          }}
          onUpdate={handleUpdatePG}
          ownerId={user?.id}
        />

        {/* PG Bookings Modal */}
        <PGBookingsModal
          pg={selectedPG}
          isOpen={bookingsModalOpen}
          onClose={() => {
            setBookingsModalOpen(false);
            setSelectedPG(null);
          }}
        />
      </div>
    </div>
  );
};

export default OwnerDashboard;