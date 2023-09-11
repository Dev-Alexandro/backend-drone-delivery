import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import deliveryRoutes from './src/routes/delivery.routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', 
};


app.use(cors(corsOptions));


app.use('/api', authRoutes);
app.use('/api/delivery', deliveryRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});