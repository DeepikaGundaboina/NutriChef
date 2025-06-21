import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <Link to="/" className="text-white text-xl font-bold">NutriChef</Link>
    </nav>
  );
};

export default Navbar;
