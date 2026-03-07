const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const authRoutes = require('./routes/auth');

if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, config.uploadDir)));
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(config.port, () => {
  console.log(`NestSync API running on http://localhost:${config.port}`);
});
