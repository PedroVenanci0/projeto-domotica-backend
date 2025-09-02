import type { Request, Response } from "express";
import { AcaoModel } from '../models/acaoModel.js';

/**
 * Cria uma nova ação e a associa a uma cena.
 */
export const criarAcao = async (req: Request, res: Response) => {
    const { id_cena } = req.params;
    const { id_dispositivo, estado_dispositivo, intervalo_segundos } = req.body;

    if (!id_dispositivo) {
        return res.status(400).json({ mensagem: 'O campo "id_dispositivo" é obrigatório.' });
    }
    if (estado_dispositivo === undefined) {
        return res.status(400).json({ mensagem: 'O campo "estado_dispositivo" é obrigatório.' });
    }
    const intervalo = intervalo_segundos ?? 0;

    try {
        const dadosParaCriar = {
            id_cena: Number(id_cena),
            id_dispositivo: id_dispositivo,
            estado_dispositivo: estado_dispositivo,
            intervalo_segundos: intervalo
        };
        const novaAcao = await AcaoModel.criar(dadosParaCriar);
        res.status(201).json(novaAcao);
    } catch (error) {
        console.error('Erro no controller ao criar ação:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const buscarAcaoPorId = async (req: Request, res: Response) => {
    const { id_acao } = req.params;
    try {
        const acao = await AcaoModel.buscarPorId(Number(id_acao));
        if (acao) {
            res.status(200).json(acao);
        } else {
            res.status(404).json({ mensagem: 'Ação não encontrada.' });
        }
    } catch (error) {
        console.error('Erro no controller ao buscar ação:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const atualizarAcao = async (req: Request, res: Response) => {
    const { id_acao } = req.params;
    const camposParaAtualizar: {
        id_dispositivo?: number;
        estado_dispositivo?: boolean;
        intervalo_segundos?: number;
    } = {};
    if (req.body.id_dispositivo) camposParaAtualizar.id_dispositivo = req.body.id_dispositivo;
    if (req.body.estado_dispositivo !== undefined) camposParaAtualizar.estado_dispositivo = req.body.estado_dispositivo;
    if (req.body.intervalo_segundos !== undefined) camposParaAtualizar.intervalo_segundos = req.body.intervalo_segundos;
    if (Object.keys(camposParaAtualizar).length === 0) {
        return res.status(400).json({ mensagem: 'Nenhum campo válido para atualização foi fornecido.' });
    }
    try {
        const acaoAtualizada = await AcaoModel.atualizar(Number(id_acao), camposParaAtualizar);
        if (acaoAtualizada) {
            res.status(200).json(acaoAtualizada);
        } else {
            res.status(404).json({ mensagem: 'Ação não encontrada.' });
        }
    } catch (error) {
        console.error('Erro no controller ao atualizar ação:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const deletarAcao = async (req: Request, res: Response) => {
    const { id_acao } = req.params;
    try {
        const acaoDeletada = await AcaoModel.deletar(Number(id_acao));
        if (acaoDeletada) {
            res.status(204).send();
        } else {
            res.status(404).json({ mensagem: 'Ação não encontrada.' });
        }
    } catch (error) {
        console.error('Erro no controller ao deletar ação:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};
