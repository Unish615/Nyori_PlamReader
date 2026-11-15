import { Router } from 'express';
import { authRouter } from './authRoutes.js';
import { kundaliRouter } from './kundaliRoutes.js';
import { palmRouter } from './palmRoutes.js';
import { assistantRouter } from './assistantRoutes.js';
import { userRouter } from './userRoutes.js';
import { reportsRouter } from './reportsRoutes.js';
import { adminRouter } from './adminRoutes.js';
import { planRouter } from './planRoutes.js';
import { paymentRouter } from './paymentRoutes.js';
import { creditRouter } from './creditRoutes.js';
import { NEPAL_DISTRICTS } from '../utils/nepalLocations.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/kundali', kundaliRouter);
apiRouter.use('/palm', palmRouter);
apiRouter.use('/assistant', assistantRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/reports', reportsRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/plans', planRouter);
apiRouter.use('/payments', paymentRouter);
apiRouter.use('/credits', creditRouter);

// Public helper route to fetch all Nepal locations
apiRouter.get('/locations/nepal', (req, res) => {
  res.json({ success: true, data: NEPAL_DISTRICTS });
});

// Health check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Nyoria चिना Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});
