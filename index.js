// index.js

// Load environment variables from .env
require('dotenv').config();

// Core dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import route handlers
const registerRoute = require('./routes/register');
const refreshRoute = require('./routes/refresh'); 
const proxyRoute = require('./routes/pagespeed');
const vulnerabilityRoute = require('./routes/vulnerability'); 



// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests (e.g., from WordPress site)
app.use(bodyParser.json()); // Parse incoming JSON payloads

// API Routes
app.use('/register', registerRoute); 
app.use('/refresh', refreshRoute);   
app.use('/pagespeed', proxyRoute);
app.use('/vulnerability', vulnerabilityRoute); 



// Root route (optional status check)
app.get('/', (req, res) => {
  res.send('✅ Proxy Server is running fast');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
