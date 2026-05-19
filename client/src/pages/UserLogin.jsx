import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../configs/api';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, LogIn, CheckCircle, ArrowRight } from 'lucide-react';

const UserLogin = () => {
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
      const response = await userAPI.login(formData);
      setMessageType('success');
      setMessage('Login successful! Redirecting...');
      
      login(response.data.user, 'user');
      
      setTimeout(() => {
        navigate('/pgs');
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 py-8 px-4 sm:px-6 lg:px-8 flex items-center transition-colors duration-300">
      <div className="max-w-md w-full mx-auto">
        <div className="card shadow-lg dark:bg-gray-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center">
              <LogIn className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
          </div>

          {/* Message Alert */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 animate-slide-up ${
              messageType === 'success' 
                ? 'bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300' 
                : 'bg-red-50 dark:bg-red-900 dark:bg-opacity-30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
            }`}>
              {messageType === 'success' && <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                  placeholder="john@example.com"
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
              className={`w-full btn-primary py-3 font-semibold flex items-center justify-center gap-2 mt-6 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
              <Link to="/user/register" className="text-sky-600 font-semibold hover:text-sky-700 transition duration-200">
                Create Account
              </Link>
            </p>
            <p className="text-gray-600">
              Are you a PG owner?{' '}
              <Link to="/owner/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition duration-200">
                Owner Login
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-8 bg-blue-50 rounded-xl border border-blue-200 p-4">
          <p className="text-sm text-blue-800">
            <strong>Demo Account:</strong> Use any registered email and password to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;