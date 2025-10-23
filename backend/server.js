require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const geofence = require('./config/geofence');
const AdminConfig = require('./models/AdminConfig');

const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const qrRoutes = require('./routes/qr');
const faceRoutes = require('./routes/face');
const marksRoutes = require('./routes/marks');
const timetableRoutes = require('./routes/timetable');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Load admin configuration overrides into in-memory config
(async () => {
  try {
    const cfg = await AdminConfig.findOne({ key: 'global' });
    if (cfg) {
      if (cfg.geofence?.center && typeof cfg.geofence.center.lat === 'number' && typeof cfg.geofence.center.lng === 'number') {
        geofence.center = cfg.geofence.center;
      }
      if (typeof cfg.geofence?.radiusMeters === 'number') {
        geofence.radiusMeters = cfg.geofence.radiusMeters;
      }
      if (typeof cfg.qrTtlSeconds === 'number') {
        geofence.qrTtlSeconds = cfg.qrTtlSeconds;
      }
    }
  } catch (e) {
    // swallow config load errors at startup
  }
})();

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET','POST'] }
});

// Store io in app locals for controllers to emit
app.set('io', io);

io.on('connection', (socket) => {
  // Clients can join roles/rooms in the future if needed
  socket.on('join', (room) => socket.join(room));
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/face', faceRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req, res) => res.send('Smart Attendance API running'));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
