const geofence = require('../config/geofence');

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

// Haversine distance in meters
function haversineDistanceMeters(a, b) {
  const R = 6371000; // meters
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

function isInsideCampus({ lat, lng }) {
  const distance = haversineDistanceMeters({ lat, lng }, geofence.center);
  return distance <= geofence.radiusMeters;
}

module.exports = { haversineDistanceMeters, isInsideCampus };


