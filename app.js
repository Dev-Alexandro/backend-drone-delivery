import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import deliveryRoutes from './src/routes/delivery.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', authRoutes);
app.use('/api/delivery', deliveryRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});