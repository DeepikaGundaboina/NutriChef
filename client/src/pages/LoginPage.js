import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      console.log('Login API response:', res.data); // Add this line


      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);

      alert('Login successful!');
      navigate('/'); // Redirect to home page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-white">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">NutriChef Login</h2>

      {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account? <a href="/signup" className="text-green-600 font-semibold">Sign up</a>
      </p>
    </div>
  </div>
);

};

export default LoginPage;
