#!/bin/bash

echo "🔧 Setting up environment variables..."

# Create backend .env if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env..."
    cat > backend/.env << EOF
# MongoDB Connection String
# Get this from MongoDB Atlas dashboard
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartattendance?retryWrites=true&w=majority

# JWT Secret Key (make this long and random)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Server Port
PORT=5001
EOF
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists"
fi

# Create frontend .env.local if it doesn't exist
if [ ! -f "frontend/.env.local" ]; then
    echo "Creating frontend/.env.local..."
    cat > frontend/.env.local << EOF
# API URL for your deployed backend
# Update this to your Vercel deployment URL
NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app
EOF
    echo "✅ Created frontend/.env.local"
else
    echo "⚠️  frontend/.env.local already exists"
fi

echo "📝 Please update the environment variables with your actual values:"
echo "1. Get MongoDB connection string from MongoDB Atlas"
echo "2. Generate a secure JWT secret"
echo "3. Update the API URL after deployment"
echo ""
echo "See DEPLOYMENT.md for detailed instructions"
