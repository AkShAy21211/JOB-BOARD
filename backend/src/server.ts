import 'dotenv/config';
import app from './app';
import connectMongo from './config/mongo';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

void startServer();
