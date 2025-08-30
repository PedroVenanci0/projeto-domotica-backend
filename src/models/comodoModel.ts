import { pool } from "../config/database.js";

export const ComodoModel = {

    criar: async (nomeDoComodo: string) => {
        console.log('3. Model criar foi chamado com o nome:', nomeDoComodo);
        const sql = 'INSERT INTO COMODO (NOME_COMODO) VALUES ($1) RETURNING *;';
        const values = [nomeDoComodo];
        
        try {
            console.log('4. Model vai executar a query no banco...');
            const resultado = await pool.query(sql, values);
            console.log('Query executada com sucesso!');
            return resultado.rows[0];
        } catch (error) {
            console.error('ERRO: Erro ao executar a query no Model:', error);
            throw error;
        }
    },

    listar: async () => {
        const sql = 'SELECT * FROM COMODO'

        try {
            console.log('Model vai executar a query no banco...');
            const resultado = await pool.query(sql);
            console.log('Query executada com sucesso!');
            return resultado.rows;
        } catch (error) {
            console.error('Erro: erro ao executar a query no model:', error);
            throw error;
        }
    }
};