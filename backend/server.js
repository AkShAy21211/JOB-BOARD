require('dotenv').config();
const app = require('./src/app');
const connectMongo = require('./src/config/mongo');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongo();
    
    // Connect to Postgres happens lazily via pool, but we can test it here if needed
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
