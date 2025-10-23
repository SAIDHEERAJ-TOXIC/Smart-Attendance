// Campus geofence configuration. Center + radius approach.
// NOTE: Update lat/lng after validation on-site.
module.exports = {
  center: { lat: 15.797247, lng: 78.077507 },
  radiusMeters: 250, // conservative campus radius
  // Default QR validity window (in seconds) for scans
  qrTtlSeconds: 300,
};


