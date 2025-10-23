const mongoose = require('mongoose');

const connectDB = async () => {
  // Allow booting the app without a database for local checks
  if (process.env.SKIP_DB === '1' || process.env.SKIP_DB === 'true') {
    console.warn('Skipping MongoDB connection because SKIP_DB is set.');
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
