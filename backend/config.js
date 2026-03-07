require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL || 'postgresql://nestsync:nestsync@localhost:5432/nestsync',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
};
