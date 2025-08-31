import { Query } from "pg";
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

    listarTodos: async () => {
        const sql = `
            SELECT
                C.ID_COMODO,
                C.NOME_COMODO,
                COALESCE(
                    (
                        SELECT JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id_dispositivo', D.ID_DISPOSITIVO,
                                'nome_dispositivo', D.NOME_DISPOSITIVO,
                                'estado_dispositivo', D.ESTADO_DISPOSITIVO
                            )
                        )
                        FROM DISPOSITIVO D
                        WHERE D.ID_COMODO = C.ID_COMODO
                    ),
                    '[]'::json
                ) as dispositivos
            FROM
                COMODO C;
        `;

        try {
            console.log('Model vai executar a query no banco...');
            const resultado = await pool.query(sql);
            console.log('Query executada com sucesso!');
            return resultado.rows;
        } catch (error) {
            console.error('Erro: erro ao executar a query no model:', error);
            throw error;
        }
    },

    atualizar:  async (id: number, novoNome: string) => {
        const sql = 'UPDATE COMODO SET NOME_COMODO = $2 WHERE ID_COMODO = $1 RETURNING *;';
        const values = [id, novoNome];

        try {
            const resultado = await pool.query(sql, values)
            return resultado.rows[0]
        }  catch (error){
            console.error('EErro: erro ao executar a query no model:', error);
            throw error;
        }
    },

    deletar: async (id: number) => {
        const sql = 'UPDATE COMODO SET ATIVO = FALSE WHERE ID_COMODO = $1 RETURNING *'
        const values = [id]

        try {
            const resultado = await pool.query(sql, values)
            return resultado.rows[0]
        } catch (error){
            console.error('Erro: erro ao executar a query no model: ', error)
            throw error;
        }
    }
};