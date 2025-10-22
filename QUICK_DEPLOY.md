# 🚀 Quick Deploy Guide - Smart Attendance System

## ⚡ Quick Start (5 minutes)

### 1. Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)

### 2. One-Command Setup
```bash
# Install dependencies
npm run install:all

# Setup environment variables
npm run setup

# Deploy to Vercel
npm run deploy
```

### 3. Manual Steps

#### 3.1 Create MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Update `backend/.env` with your connection string

#### 3.2 Configure Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Any long random string
   - `NEXT_PUBLIC_API_URL`: Your Vercel app URL

#### 3.3 Deploy
```bash
vercel --prod
```

## 🔧 Environment Variables

### Backend (.env)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartattendance
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5001
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

## 📱 Test Your Deployment

1. Visit your Vercel URL
2. Register a new student account
3. Test login functionality
4. Check all features work

## 🆘 Need Help?

- **Detailed Guide**: See `DEPLOYMENT.md`
- **Issues**: Check Vercel logs
- **Database**: Verify MongoDB Atlas connection

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set
- [ ] Vercel deployment successful
- [ ] App loads correctly
- [ ] Registration works
- [ ] Login works

---

**Ready to deploy? Run `npm run deploy` and follow the prompts!** 🚀
