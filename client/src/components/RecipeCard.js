import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      {/* Title */}
      <h2 className="text-xl font-semibold">{recipe.title}</h2>

      {/* Calories */}
      {recipe.nutrition && recipe.nutrition.nutrients ? (
        <p><strong>Calories:</strong> {recipe.nutrition.nutrients[0]?.amount}</p>
      ) : (
        <p><strong>Calories:</strong> Not available</p>
      )}

      {/* Ingredients */}
      {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
        <p><strong>Ingredients:</strong></p>
      ) : (
        <p><strong>Ingredients:</strong> Not available</p>
      )}

      {/* List ingredients */}
      <ul>
        {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      {/* Instructions */}
      {recipe.instructions ? (
        <p><strong>Instructions:</strong> {recipe.instructions}</p>
      ) : (
        <p><strong>Instructions:</strong> Not available</p>
      )}

      {/* Link to Recipe Details Page */}
      <Link to={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default RecipeCard;


