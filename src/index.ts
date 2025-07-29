
import dotenv from 'dotenv';
dotenv.config();
import { app, connectDB } from './modules/app';

const PORT = process.env.PORT || 3001;

console.log('Current working directory:', process.cwd());

const startServer = async () => {
  await connectDB(); // first connect to MongoDB
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
