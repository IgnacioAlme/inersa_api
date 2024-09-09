import express from 'express';
import clientesRoutes from './routes/clientes.routes.js';
import indexRoutes from './routes/index.routes.js';
import repuestosRoutes from './routes/repuestos.routes.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());
app.use('/api', clientesRoutes);
app.use('/api', repuestosRoutes);
app.use(indexRoutes);

app.listen(PORT);
