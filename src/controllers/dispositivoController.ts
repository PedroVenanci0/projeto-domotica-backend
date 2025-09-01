import type { Request, Response } from "express";
import {dispositivoModel} from '../models/dispositivoModel.js'

export const criarDispositivo = async (req: Request, res: Response) => {
    console.log('Controller Criar dispositivo foi chamado')
    const { nome } = req.body
    const { id_comodo } = req.body

    if (!nome){
        console.log('Error: Nome nao foi reconhecido')
        return res.status(400).json({mensagem: 'O campo nome é obrigatorio'})
    } else if (!id_comodo){
        console.log('Error: id_comodo nao foi fornecido')
        return res.status(400).json({mensagem: 'O campo id_comodo é obrigatorio'})
    }
    try{
        console.log('O controller vai chamar o model para criar o dispositivo');
        const novoDispositivo = await dispositivoModel.criar(nome, Number(id_comodo));
        console.log('Model retornou para o controller com sucesso');
        res.status(201).json(novoDispositivo);
    }  catch (error){
        console.log('Ocorreu um Erro no Controler: ', error)
        res.status(500).json({mensagem: 'Erro interno no Servidor'})
    }
}

export const listarDispositivos = async (req: Request, res: Response) => {
    try {
        const todosOsDispositivos = await dispositivoModel.listarTodos();
        res.status(200).json(todosOsDispositivos);
    } catch (error){
        console.error('Error no controller ao listar Cômodos')
        res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

export const atualizarDispositivo = async (req: Request, res: Response) => {
    const { id } = req.params;
 
    const camposParaAtualizar: { nome?: string; estado?: boolean } = {};

    if (req.body.nome) {
        camposParaAtualizar.nome = req.body.nome;
    }

    if (req.body.estado !== undefined) {
        camposParaAtualizar.estado = req.body.estado;
    }

    if (Object.keys(camposParaAtualizar).length === 0) {
        return res.status(400).json({ mensagem: 'Nenhum campo válido para atualização foi fornecido.' });
    }

    try {
        const dispositivoAtualizado = await dispositivoModel.atualizar(Number(id), camposParaAtualizar);

        if (dispositivoAtualizado) {
            res.status(200).json(dispositivoAtualizado);
        } else {
            res.status(404).json({ mensagem: 'Dispositivo não encontrado.' });
        }
    } catch (error) {
        console.error('Erro no controller ao atualizar dispositivo:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const deletarDispositivo = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id){
        console.log('Id nao fornceido')
        res.status(400).json({mensagem: 'O campo id é obrigatorio'})
    }
    try {
        const dispositivoDeletado = await dispositivoModel.deletar(Number(id))
        if (dispositivoDeletado){
            res.status(201).json(dispositivoDeletado)
            console.log('Dispositivo deletado')
        } else{
            res.status(404).json({ mensagem: 'Dispositivo nao encontrado' })
        }
    } catch (error){
        res.status(500).json({mensagem: 'Erro interno no servidor'})
    }
}