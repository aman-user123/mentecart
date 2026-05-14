import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRouter);

// health check
app.get('/', (req, res) => {
  res.json({ message: 'MenteCart API running ' });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(' MongoDB connected');
    app.listen(PORT, () => console.log(` Server on port ${PORT}`));
  })
  .catch((error) => console.error(' MongoDB error:', error));

export default app;