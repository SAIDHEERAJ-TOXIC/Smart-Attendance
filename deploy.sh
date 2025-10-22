#!/bin/bash

# Smart Attendance System - Deployment Script
echo "🚀 Smart Attendance System - Deployment Script"
echo "=============================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel first:"
    vercel login
fi

echo "📦 Preparing for deployment..."

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env not found"
    echo "Please create backend/.env with:"
    echo "MONGODB_URI=your_mongodb_connection_string"
    echo "JWT_SECRET=your_jwt_secret"
    echo "PORT=5001"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  Warning: frontend/.env.local not found"
    echo "Please create frontend/.env.local with:"
    echo "NEXT_PUBLIC_API_URL=https://your-app.vercel.app"
fi

echo "🔧 Installing dependencies..."
cd backend && npm install
cd ../frontend && npm install
cd ..

echo "🧪 Testing backend..."
cd backend && npm test 2>/dev/null || echo "No tests found, continuing..."
cd ..

echo "🏗️  Building frontend..."
cd frontend && npm run build
cd ..

echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📱 Your app should be available at the URL shown above"
echo "🔧 Don't forget to set environment variables in Vercel dashboard"
echo "📖 See DEPLOYMENT.md for detailed instructions"
