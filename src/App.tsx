import { useState, useEffect, type JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { refreshAccessToken, getAccessToken } from './authStore';
import { Login } from './LoginPage';
import LoginSuccess from './Login';
import Home from './Home';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await refreshAccessToken();
      if (token) {
        setIsAuthenticated(true);
      }
      setIsInitializing(false);
    };
    initializeAuth();
  }, []);

  if (isInitializing) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Loading application...</h2>
      </div>
    );
  }

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated && !getAccessToken()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/login-success"
          element={<LoginSuccess onLogin={() => setIsAuthenticated(true)} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
