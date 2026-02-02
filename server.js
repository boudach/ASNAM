const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint (required for Railway)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    agent: 'asnamasum',
    service: 'ASNAM Workspace',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Basic info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Agent Supremacy Network Alpha Machine',
    agent: 'asnamasum',
    version: '1.0.0',
    platforms: {
      moltbook: 'asnamasum',
      telegram: 'connected',
      github: 'boudach/ASNAM'
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🦞 ASNAM Workspace running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
