import { useState, useEffect, type JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { refreshAccessToken, getAccessToken } from './authStore';
import { Login } from './LoginPage';
import LoginSuccess from './Login';
import Home from './Home';
import NotFound from './NotFound';
import Navbar from './Navbar';

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

  const ProtectedRoute = ({ children }: { children?: JSX.Element }) => {
    if (!isAuthenticated && !getAccessToken()) {
      return <Navigate to="/login" replace />;
    }
    return children ?? <Outlet />;
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
       
        <Route element={<ProtectedRoute />}>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
