import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import announcementRoutes from './routes/announcementRoutes';
import commentRoutes from './routes/commentRoutes';
import advisorRoutes from './routes/advisorRoutes';
import { authenticateToken } from './middleware/authMiddleware';

dotenv.config(); // Ensure environment variables are loaded

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/announcements', authenticateToken, announcementRoutes);
app.use('/api/comments', authenticateToken, commentRoutes);
app.use('/api/advisors', authenticateToken, advisorRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
