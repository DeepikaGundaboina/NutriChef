import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/recipes/${id}`);
        setRecipe(response.data);
        console.log('✅ Fetched recipe:', response.data);
      } catch (error) {
        console.error('❌ Failed to fetch recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!recipe) return <p className="text-center mt-10 text-lg text-red-600">Recipe not found.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '1.5rem',
          backgroundColor: '#10b981', // emerald green for a fresh look
          color: '#ffffff', // white text for contrast
          padding: '0.6rem 1.2rem',
          borderRadius: '9999px', // fully rounded button (pill-shaped)
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#059669'; // darker green on hover
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#10b981'; // revert back
        }}
        
      >
        ← Go Back
      </button>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{recipe.title}</h1>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: '70%', borderRadius: '8px', marginBottom: '1rem' }}
        />
      )}

      {recipe.summary && (
        <div
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
          style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}
        />
      )}

      {recipe.extendedIngredients?.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '2rem' }}>🧂 Ingredients</h2>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {recipe.extendedIngredients.map((ing) => (
              <li key={ing.id} style={{ marginBottom: '0.5rem' }}>
                {ing.original}
              </li>
            ))}
          </ul>
        </>
      )}

      {recipe.instructions && (
        <>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '2rem' }}>👩‍🍳 Instructions</h2>
          <div
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            style={{ lineHeight: '1.6' }}
          />
        </>
      )}

      {recipe.nutrition?.nutrients?.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '2rem' }}>🥗 Nutritional Insights</h2>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {recipe.nutrition.nutrients.map((nutrient, index) => (
              <li key={index} style={{ marginBottom: '0.3rem' }}>
                {nutrient.name}: {nutrient.amount} {nutrient.unit}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;






