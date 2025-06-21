import React, { useEffect, useState } from 'react';
import { getRecipes, searchRecipesByIngredients } from '../utils/api';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch default recipes on mount
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Handle ingredient-based search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trimmedInput = searchInput.trim();

      if (trimmedInput === '') {
        const allRecipes = await getRecipes();
        setRecipes(allRecipes);
      } else {
        const searchResults = await searchRecipesByIngredients(trimmedInput);
        setRecipes(searchResults);
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <div style={{ position: 'relative', marginBottom: '1rem', height: '3rem' }}>
  <h1
    className="text-3xl font-bold text-green-700"
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      margin: 0,
    }}
  >
    NutriChef Recipes
  </h1>

  <button
    onClick={() => navigate('/login')}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
  >
    Login
  </button>
</div>
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter ingredients (e.g., chicken, rice)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </form>

      {/* Recipes Display */}
      {loading ? (
        <p className="text-lg text-gray-600">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-lg text-red-600">No recipes found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
  {recipes.map((recipe) => (
    <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
      <div className="recipe-card">
        <h2 className="recipe-title">
          {recipe.title || 'Untitled Recipe'}
        </h2>
        <img
          src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={recipe.title || 'Recipe image'}
          className="recipe-image"
        />
      </div>
    </Link>
  ))}
</div>

      )}
    </div>
  );
};

export default HomePage;






