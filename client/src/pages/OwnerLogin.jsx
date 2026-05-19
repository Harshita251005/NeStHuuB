import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ownerAPI } from '../configs/api';
import { useAuth } from '../contexts/AuthContext';
import { Building, Mail, Lock, LogIn, CheckCircle } from 'lucide-react';

const OwnerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const response = await ownerAPI.login(formData);
      setMessageType('success');
      setMessage('Login successful! Redirecting...');
      
      login(response.data.owner, 'owner');
      
      setTimeout(() => {
        navigate('/owner/dashboard');
      }, 1000);
      
    } catch (error) {
      setMessageType('error');
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      setMessage(errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-4 flex items-center">
      <div className="max-w-md w-full mx-auto">
        <div className="card shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-emerald-100 to-green-100 w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center">
              <Building className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Owner Login</h2>
            <p className="text-gray-600 mt-2">Sign in to manage your PGs</p>
          </div>

          {/* Message Alert */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 animate-slide-up ${
              messageType === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {messageType === 'success' && <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="owner@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-success py-3 font-semibold flex items-center justify-center gap-2 mt-6 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing In...' : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Footer Links */}
          <div className="space-y-3 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/owner/register" className="text-emerald-600 font-semibold hover:text-emerald-700 transition duration-200">
                Register as Owner
              </Link>
            </p>
            <p className="text-gray-600">
              Looking for a PG?{' '}
              <Link to="/user/login" className="text-sky-600 font-semibold hover:text-sky-700 transition duration-200">
                User Login
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <p className="text-sm text-emerald-800">
            <strong>Owner Portal:</strong> Manage your PGs, view bookings, and track your earnings in one place
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;