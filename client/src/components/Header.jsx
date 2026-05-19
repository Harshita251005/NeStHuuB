import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Home, User, Building, Plus, Calendar, LogOut, Settings, Menu, X, Moon, Sun, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { user, userType, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-soft dark:shadow-dark-soft border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition duration-200" onClick={closeMobileMenu}>
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-400 p-2 rounded-xl shadow-soft dark:shadow-dark-soft">
              <div className="flex items-center justify-center">
                <Zap className="h-6 w-6 text-white mr-0.5" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-300 bg-clip-text text-transparent">NestHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg transition duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            
            <Link 
              to="/pgs" 
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg transition duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
            >
              <Building className="h-4 w-4" />
              <span className="text-sm font-medium">Browse PGs</span>
            </Link>
            
            {userType === 'owner' && (
              <Link 
                to="/add-pg" 
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-lg transition duration-200 hover:bg-purple-50 dark:hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Add PG</span>
              </Link>
            )}
            
            <Link 
              to="/bookings" 
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-lg transition duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Bookings</span>
            </Link>
          </nav>

          {/* Desktop Auth section and Theme toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-gray-800">
                  <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
                </div>
                {userType === 'owner' && (
                  <Link 
                    to="/owner/dashboard"
                    className="btn-secondary flex items-center gap-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="btn-secondary flex items-center gap-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/user/login" 
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition duration-200"
                >
                  User Login
                </Link>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <Link 
                  to="/owner/login" 
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition duration-200"
                >
                  Owner Login
                </Link>
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                <Link 
                  to="/user/register" 
                  className="btn-secondary text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100"
                >
                  User Sign Up
                </Link>
                <Link 
                  to="/owner/register" 
                  className="btn-primary text-sm"
                >
                  Owner Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 transition duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Navigation Links */}
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 transition duration-200"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>
              
              <Link 
                to="/pgs" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 transition duration-200"
              >
                <Building className="h-5 w-5" />
                <span className="font-medium">Browse PGs</span>
              </Link>
              
              {userType === 'owner' && (
                <Link 
                  to="/add-pg" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-700 transition duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Add PG</span>
                </Link>
              )}
              
              <Link 
                to="/bookings" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 transition duration-200"
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Bookings</span>
              </Link>

              {/* Auth Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Welcome, <span className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</span>
                      </p>
                    </div>
                    
                    {userType === 'owner' && (
                      <Link 
                        to="/owner/dashboard"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-gray-700 transition duration-200"
                      >
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-700 transition duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        to="/user/login" 
                        onClick={closeMobileMenu}
                        className="px-3 py-2.5 text-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg font-medium transition duration-200"
                      >
                        User Login
                      </Link>
                      <Link 
                        to="/owner/login" 
                        onClick={closeMobileMenu}
                        className="px-3 py-2.5 text-center text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg font-medium transition duration-200"
                      >
                        Owner Login
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <Link 
                        to="/user/register" 
                        onClick={closeMobileMenu}
                        className="btn-secondary text-center text-sm dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
                      >
                        User Sign Up
                      </Link>
                      <Link 
                        to="/owner/register" 
                        onClick={closeMobileMenu}
                        className="btn-primary text-center text-sm"
                      >
                        Owner Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;