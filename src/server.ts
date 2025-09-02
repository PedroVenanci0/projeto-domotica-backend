import dotenv from 'dotenv';
dotenv.config();
console.log('--- Verificando Variáveis de Ambiente ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD existe?', !!process.env.DB_PASSWORD); // Apenas para ver se a senha foi carregada
console.log('-----------------------------------------'); 
    
    
import express from 'express';
import comodoRoutes from './routes/comodoRoutes.js';
import dispositivoRoutes from './routes/dispositivoRoutes.js'
import cenaRoutes from './routes/cenaRoutes.js';
import acaoRoutes from './routes/acaoRoutes.js';

// Cria a aplicação Express
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/comodos', comodoRoutes)
app.use('/api/dispositivos', dispositivoRoutes)
app.use('/api/cenas', cenaRoutes); 
app.use('/api/acoes', acaoRoutes); 

// O comando que mantém o servidor "vivo", ouvindo na porta 3000
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:3000`);
}); 

    