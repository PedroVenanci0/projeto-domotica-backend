import { pool } from '../config/database.js';

export const AcaoModel = {

    criar: async (dados: {
        id_cena: number;
        id_dispositivo: number;
        estado_dispositivo: boolean;
        intervalo_segundos: number;
    }) => {
        const sql = `
            INSERT INTO ACAO (ID_CENA, ID_DISPOSITIVO, ESTADO_DISPOSITIVO, INTERVALO_SEGUNDOS) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        const values = [
            dados.id_cena,
            dados.id_dispositivo,
            dados.estado_dispositivo,
            dados.intervalo_segundos
        ];

        try {
            const resultado = await pool.query(sql, values);
            return resultado.rows[0];
        } catch (error) {
            console.error('Erro ao criar ação no model:', error);
            throw error;
        }
    },

    buscarPorId: async (id_acao: number) => {
        const sql = 'SELECT * FROM ACAO WHERE ID_ACAO = $1;';
        const values = [id_acao];

        try {
            const resultado = await pool.query(sql, values);
            return resultado.rows[0];
        } catch (error) {
            console.error('Erro ao buscar ação por ID no model:', error);
            throw error;
        }
    },


    atualizar: async (id_acao: number, campos: {
        id_dispositivo?: number;
        estado_dispositivo?: boolean;
        intervalo_segundos?: number;
    }) => {
        const chaves = Object.keys(campos);
        if (chaves.length === 0) return null;

        const setClause = chaves
            .map((chave, index) => `${chave.toUpperCase()} = $${index + 1}`)
            .join(', ');

        const values = [...Object.values(campos), id_acao];
        const sql = `UPDATE ACAO SET ${setClause} WHERE ID_ACAO = $${values.length} RETURNING *;`;

        try {
            const resultado = await pool.query(sql, values);
            return resultado.rows[0];
        } catch (error) {
            console.error('Erro ao atualizar ação no model:', error);
            throw error;
        }
    },

    deletar: async (id_acao: number) => {
        const sql = 'DELETE FROM ACAO WHERE ID_ACAO = $1 RETURNING *;';
        const values = [id_acao];

        try {
            const resultado = await pool.query(sql, values);
            return resultado.rows[0];
        } catch (error) {
            console.error('Erro ao deletar ação no model:', error);
            throw error;
        }
    },
};
