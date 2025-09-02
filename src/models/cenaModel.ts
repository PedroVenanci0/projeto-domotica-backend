import { Query } from "pg";
import { pool } from '../config/database.js';

export const CenaModel = {
    
    criar: async ( nome: string) => {
        const sql = 'INSERT INTO CENA (NOME_CENA) VALUES ($1) RETURNING *;'
        const values = [nome]

        try{
            const resultado = await pool.query(sql, values)
            return resultado.rows[0]
        } catch (error){
            console.error('Erro ao executar a Quary no model')
            throw error
        }
    },

    listarTodos: async () => {
        const sql = 'SELECT * FROM CENA WHERE ATIVO = TRUE;'
        
        try{
            const resultado = await pool.query(sql)
            return resultado.rows
        } catch (error){
            console.error('Erro a executar a Query no Model')
            throw error
        }
    },

    listarSomenteUm: async (id: number) => {
        const sql = `
            SELECT
                c.id_cena,
                c.nome_cena,
                c.ativo,
                COALESCE(
                    (
                        SELECT JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id_acao', a.id_acao,
                                'intervalo_segundos', a.intervalo_segundos,
                                'dispositivo', JSON_BUILD_OBJECT(
                                    'id_dispositivo', d.id_dispositivo,
                                    'nome_dispositivo', d.nome_dispositivo,
                                    'estado_desejado', a.estado_dispositivo
                                )
                            )
                        )
                        FROM acao a
                        JOIN dispositivo d ON a.id_dispositivo = d.id_dispositivo
                        WHERE a.id_cena = c.id_cena
                    ),
                    '[]'::json
                ) as acoes
            FROM
                cena c
            WHERE
                c.ativo = true AND c.id_cena = $1;
        `;
        const values = [id];

        try {
            const resultado = await pool.query(sql, values);
            return resultado.rows[0];
        } catch (error) {
            console.error('Erro ao buscar cena por ID:', error);
            throw error;
        }
    },

    atualizar: async (id: number, campos: { nome_cena?: string; ativo?: boolean }) => {
        const chaves = Object.keys(campos);

        if (chaves.length === 0) {
            return null; 
        }
        const setClause = chaves
            .map((chave, index) => `${chave.toUpperCase()} = $${index + 1}`)
            .join(', ');

        const values = [...Object.values(campos), id];

        const sql = `UPDATE CENA SET ${setClause} WHERE ID_CENA = $${values.length} RETURNING *;`;

        try {
            const resultado = await pool.query(sql, values);
            return resultado.rows[0];
        } catch (error) {
            console.error('Erro ao atualizar cena:', error);
            throw error;
        }
    },

    deletar: async (id: number) => {
        const sql = 'UPDATE CENA SET ATIVO = false WHERE ID_CENA = $1 RETURNING *;';
        const values = [id];

        try {
            const resultado = await pool.query(sql, values);
            return resultado.rows[0];
        } catch (error) {
            console.error('Erro ao deletar cena:', error);
            throw error;
        }
    },

};