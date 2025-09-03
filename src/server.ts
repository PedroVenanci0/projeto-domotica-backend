import dotenv from 'dotenv';
dotenv.config();

console.log('--- Verificando Variáveis de Ambiente ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD existe?', !!process.env.DB_PASSWORD);
console.log('-----------------------------------------');

import express from 'express';
import cors from 'cors'; // 🔹 Importando o cors

import comodoRoutes from './routes/comodoRoutes.js';
import dispositivoRoutes from './routes/dispositivoRoutes.js';
import cenaRoutes from './routes/cenaRoutes.js';
import acaoRoutes from './routes/acaoRoutes.js';

const app = express();
const PORT = 3000;

// 🔹 Habilitando o CORS (permite requisições de qualquer origem)
app.use(cors());

// Caso queira restringir:
// app.use(cors({ origin: 'http://localhost:5173' })); // exemplo para frontend rodando no Vite

app.use(express.json());

app.use('/api/comodos', comodoRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/cenas', cenaRoutes);
app.use('/api/acoes', acaoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:3000`);
});
