import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check authentication status
  const checkAuth = () => {
    const userData = localStorage.getItem('user');
    const ownerData = localStorage.getItem('owner');
    const type = localStorage.getItem('userType');
    
    if (userData && type === 'user') {
      setUser(JSON.parse(userData));
      setUserType('user');
    } else if (ownerData && type === 'owner') {
      setUser(JSON.parse(ownerData));
      setUserType('owner');
    } else {
      setUser(null);
      setUserType(null);
    }
    setLoading(false);
  };

  // Function to login user
  const login = (userData, type) => {
    if (type === 'user') {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else if (type === 'owner') {
      localStorage.setItem('owner', JSON.stringify(userData));
      setUser(userData);
    }
    localStorage.setItem('userType', type);
    setUserType(type);
  };

  // Function to logout user
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('owner');
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
  };

  // Check auth status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Listen for storage changes (in case of multiple tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    user,
    userType,
    loading,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
    isUser: userType === 'user',
    isOwner: userType === 'owner'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};