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