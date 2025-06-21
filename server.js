require('dotenv').config({ path: './secret_key.env' });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5001;
const authRoutes = require('./routes/authRoutes');


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Deepika@4311',
  database: 'nutrichef',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

const SPOONACULAR_API_KEY = '8c36a44ee0054722b1e376899e53e538';

// 🔥 NEW: Get default random recipes
app.get('/recipes', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          number: 6, // Feel free to change the number of recipes
        },
      }
    );
    res.status(200).json(response.data.recipes);
  } catch (error) {
    console.error('❌ Error fetching random recipes from Spoonacular:', error.message);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

// ✅ Ingredient-based recipe search
app.get('/search', async (req, res) => {
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).json({ message: 'Ingredients are required' });
  }

  console.log('📥 Searching for recipes with ingredients:', ingredients);

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          ingredients: ingredients,
          number: 5,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error searching recipes from Spoonacular:', error.message);
    res.status(500).json({ message: 'Failed to search recipes' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          includeNutrition: true, // ⚠️ required for nutrition data
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error fetching recipe details:', error.message);
    res.status(500).json({ message: 'Failed to fetch recipe details' });
  }
});



// 🔧 Root and test routes
app.get('/', (req, res) => {
  res.send('NutriChef Backend is Running');
});

app.get('/test/:id', (req, res) => {
  res.send(`✅ Working! You sent ID: ${req.params.id}`);
});

// Start server
app.listen(PORT, () => {
  console.log('🔥🔥🔥 RUNNING FROM server.js 🔥🔥🔥');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});








  