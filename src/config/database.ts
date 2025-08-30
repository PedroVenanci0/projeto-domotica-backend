import dotenv from 'dotenv';
import pg from 'pg';

// Carrega as variáveis do arquivo .env
dotenv.config();

// O pacote 'pg' é um pouco antigo na forma como lida com módulos,
// então extraímos a classe 'Pool' desta forma.
const { Pool } = pg;

// Criamos a instância do Pool de conexões
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Convertemos a porta para número
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Um "ouvinte" para o evento de conexão, apenas para sabermos que funcionou.
pool.on('connect', () => {
  console.log('Conexão com o banco de dados Supabase estabelecida com sucesso!');
});

export { pool };
