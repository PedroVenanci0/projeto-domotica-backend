import { Query } from "pg";
import { pool } from "../config/database.js";

export const dispositivoModel = {

    criar: async (nomeDoDispositivo: string, id_comodo: number) => {
        console.log('3. Model criar foi chamado com o nome:', nomeDoDispositivo);
        const sql = 'INSERT INTO DISPOSITIVO (NOME_DISPOSITIVO, ID_COMODO) VALUES ($1, $2) RETURNING *;';        
        const values = [nomeDoDispositivo, id_comodo]
        try{
            console.log('Model vai executar a Query no banco')
            const resultado = await pool.query(sql, values)
            console.log('Query executada com sucesso')
           return resultado.rows[0]
        } catch (error){
            console.error('Erro ao executar a Query no model: ', error)
            throw error
        }
    },

    listarTodos: async () => {
        const sql = 'SELECT * FROM DISPOSITIVO;';
        try{
            const resultado = await pool.query(sql);
            return resultado.rows;
        } catch (error){
            console.error('Erro ao executar a Query no model:', error)
            throw error
        }
    }
}