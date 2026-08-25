// hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router'; // Remove if not using Next.js
// import { useNavigate } from 'react-router-dom'; // For React Router

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Remove if not using Next.js
  // const navigate = useNavigate(); // For React Router

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Authentication functions
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Verify token with your backend
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token invalid, clear it
          localStorage.removeItem('authToken');
          setUser(null);
        }
      }
    } catch (err) {
      console.error('Auth check error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      
      // Redirect to dashboard
      router.push('/dashboard'); // Next.js
      // navigate('/dashboard'); // React Router
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Auto-login after registration
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      
      router.push('/dashboard'); // Next.js
      // navigate('/dashboard'); // React Router
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      // Optional: Call logout endpoint
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear local storage and state
      localStorage.removeItem('authToken');
      setUser(null);
      setLoading(false);
      
      // Redirect to login
      router.push('/login'); // Next.js
      // navigate('/login'); // React Router
    }
  };

  const updateUser = (updatedUserData) => {
    setUser(prev => ({ ...prev, ...updatedUserData }));
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Optional: Higher-order component for protected routes
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter(); // Next.js
    // const navigate = useNavigate(); // React Router

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login'); // Next.js
        // navigate('/login'); // React Router
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <div>Loading...</div>; // Or your loading component
    }

    return <Component {...props} />;
  };
}