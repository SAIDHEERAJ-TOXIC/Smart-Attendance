const mongoose = require('mongoose');

const connectDB = async () => {
  // Allow skipping DB connection for local development or CI smoke tests
  if (process.env.SKIP_DB === 'true') {
    console.log('Skipping MongoDB connection because SKIP_DB=true');
    return;
  }

  const mongoConnectionUri = process.env.MONGODB_URI;
  if (!mongoConnectionUri) {
    console.error('MONGODB_URI is not set. Define it in backend/.env or environment.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoConnectionUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
