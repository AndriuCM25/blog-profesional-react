import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './src/features/auth/context/AuthContext';
import Login from './src/features/auth/pages/Login';
import Register from './src/features/auth/pages/Register';
import Profile from './src/features/profile/pages/Profile';
import Posts from './src/features/blog/pages/Posts';
import PostDetail from './src/features/blog/pages/PostDetail';
import ProtectedRoute from './src/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/blog/posts" element={<Posts />} />
          <Route path="/blog/posts/:id" element={<PostDetail />} />
          
          {/* CAMBIO: Redirigir al Blog en lugar del Profile */}
          <Route path="/" element={<Navigate to="/blog/posts" replace />} />
          <Route path="*" element={<Navigate to="/blog/posts" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;