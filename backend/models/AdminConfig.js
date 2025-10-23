const mongoose = require('mongoose');

const adminConfigSchema = new mongoose.Schema({
  key: { type: String, default: 'global', unique: true },
  geofence: {
    center: {
      lat: { type: Number, default: 15.797247 },
      lng: { type: Number, default: 78.077507 }
    },
    radiusMeters: { type: Number, default: 250 }
  },
  qrTtlSeconds: { type: Number, default: 300 }
}, { timestamps: true });

module.exports = mongoose.model('AdminConfig', adminConfigSchema);
