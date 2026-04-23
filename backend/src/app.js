const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./features/auth/auth.routes'));

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Global Error Handler
app.use(errorHandler);

module.exports = app;
