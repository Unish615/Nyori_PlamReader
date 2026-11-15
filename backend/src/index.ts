import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { standardLimiter } from './middleware/rateLimiter.js';

const app = express();

// Security and utility middlewares
app.use(helmet({
  crossOriginResourcePolicy: false
}));

app.use(cors({
  origin: '*', // Allow frontend development & production hosts
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Global rate limiting
app.use(standardLimiter);

// Mount main API
app.use('/api', apiRouter);

// Default welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'Nyoria चिना API',
    taglineEn: 'Discover What Your Hands Reveal.',
    taglineNe: 'आफ्नो हातका रेखाहरूबाट परम्परागत व्याख्या जान्नुहोस्।',
    version: '1.0.0',
    documentation: '/docs'
  });
});

// Centralized error handling
app.use(errorHandler);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`🌟 Nyoria चिना Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${ENV.NODE_ENV}`);
});

export default app;
