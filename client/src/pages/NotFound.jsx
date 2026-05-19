import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Animation */}
        <div className="mb-8 animate-fade-in">
          <div className="relative mb-4">
            <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text">
              404
            </h1>
            <div className="absolute inset-0 text-9xl font-bold text-sky-200 blur-xl opacity-30">404</div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-xl text-gray-600 mb-2">
            Page Not Found
          </p>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        {/* Emoji */}
        <div className="text-6xl mb-8 animate-pulse-soft">🏠</div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn-primary flex items-center justify-center gap-2 py-3 font-semibold"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center justify-center gap-2 py-3 font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/pgs" className="px-4 py-2 text-sm bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition duration-200 font-medium">
              Browse PGs
            </Link>
            <Link to="/user/register" className="px-4 py-2 text-sm bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition duration-200 font-medium">
              Sign Up
            </Link>
            <Link to="/user/login" className="px-4 py-2 text-sm bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition duration-200 font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;