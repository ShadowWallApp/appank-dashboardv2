//OAuth callback adalah tahap penting dalam proses login OAuth2, di mana backend mengirimkan token akses (access_token) ke frontend setelah user berhasil login lewat provider OAuth (Google, GitHub, dll).
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      await fetchUser();
      navigate('/');
    };
    
    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl font-semibold text-gray-700">
        Memproses autentikasi...
      </div>
    </div>
  );
};

export default OAuthCallback;
