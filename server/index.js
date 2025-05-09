const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi Supabase dengan validasi
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Validasi environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase environment variables missing');
  console.error(`SUPABASE_URL: ${supabaseUrl ? 'defined' : 'undefined'}`);
  console.error(`SUPABASE_SERVICE_KEY: ${supabaseKey ? 'defined' : 'undefined'}`);
  
  // You can choose to exit the process or continue with limited functionality
  // process.exit(1); // Uncomment to exit if env vars are missing
}

// Initialize Supabase only if we have the URL and key
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Check if we have a valid Supabase client
if (!supabase) {
  console.error('Warning: Supabase client not initialized. Auth routes will not work.');
}

// Middleware untuk memeriksa ketersediaan Supabase
const checkSupabase = (req, res, next) => {
  if (!supabase) {
    return res.status(503).json({
      success: false,
      message: 'Service unavailable: Database connection not configured'
    });
  }
  next();
};

// Routes untuk autentikasi - semua menggunakan middleware checkSupabase

// 1. Register
app.post('/auth/register', checkSupabase, async (req, res) => {
  try {
    const { email, password, nama } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password diperlukan'
      });
    }
    
    // Daftarkan user di Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      console.error('Error mendaftarkan user:', authError);
      return res.status(400).json({
        success: false,
        message: authError.message
      });
    }
    
    // Tambahkan data user ke tabel profiles (opsional)
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: authData.user.id,
            email,
            nama: nama || email.split('@')[0],
            created_at: new Date()
          }
        ]);
        
      if (profileError) {
        console.error('Error membuat profil:', profileError);
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      user: authData.user
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// 2. Login
app.post('/auth/login', checkSupabase, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password diperlukan'
      });
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// 3. Logout
app.post('/auth/logout', checkSupabase, async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Logout berhasil'
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// 4. Mendapatkan informasi user dari token
app.get('/auth/user', checkSupabase, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan'
      });
    }
    
    // Verifikasi dan mendapatkan user dari token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    
    // Dapatkan data profil tambahan jika ada
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    res.status(200).json({
      success: true,
      user: {
        ...user,
        profile
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// 5. Middleware untuk verifikasi token (untuk route yang memerlukan autentikasi)
const verifyToken = async (req, res, next) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        success: false,
        message: 'Service unavailable: Database connection not configured'
      });
    }
    
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak, token tidak ditemukan'
      });
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau kadaluarsa'
      });
    }
    
    // Tambahkan user ke request untuk digunakan di route selanjutnya
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
};

// Contoh route yang memerlukan autentikasi
app.get('/protected', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Anda telah mengakses route yang terproteksi',
    user: req.user
  });
});

// 6. Reset Password
app.post('/auth/reset-password', checkSupabase, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email diperlukan'
      });
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.PASSWORD_RESET_REDIRECT_URL
    });
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Link reset password telah dikirim ke email Anda'
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log(`Supabase status: ${supabase ? 'Connected' : 'Not connected'}`);
});