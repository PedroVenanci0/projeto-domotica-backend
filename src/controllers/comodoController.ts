import type { Request, Response } from 'express';
import { ComodoModel } from '../models/comodoModel.js';

export const listarSomenteUmComodo = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id){
        console.log('Error id nao encontrado')
        res.status(400).json({mensagem: 'Error campo ID é obrigatorio'})
    }
    try{
        const unicoComodo = await ComodoModel.listarSomenteUm(Number(id));
        res.status(200).json(unicoComodo);
    } catch (error) {
        console.error('Erro no controller ao listar cômodos:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

export const listarComodos = async (req: Request, res: Response) => {
    try {
        const todosOsComodos = await ComodoModel.listarTodos();
        
        res.status(200).json(todosOsComodos);

    } catch (error) {
        console.error('Erro no controller ao listar cômodos:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const criarComodo = async (req: Request, res: Response) => {
  console.log('1. Controller criarComodo foi chamado.');
  const { nome } = req.body;

  if (!nome) {
    console.log('ERRO: O nome não foi fornecido.');
    return res.status(400).json({ mensagem: 'O campo "nome" é obrigatório.' });
  }

  try {
    console.log('2. Controller vai chamar o Model para criar o cômodo:', nome);
    const novoComodo = await ComodoModel.criar(nome);
    console.log('5. Model retornou para o Controller com sucesso.');
    
    res.status(201).json(novoComodo);
  } catch (error) {
    console.log('ERRO: Ocorreu um erro no controller:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

export const atualizarComodo = async (req: Request, res: Response) => {
    console.log('Controller atualizar Cômodo foi chamado')
    const {id} = req.params
    const {nome} = req.body

    if (!nome){
        console.log('ERRO: O nome não foi fornecido.');
        return res.status(400).json({ mensagem: 'O campo "nome" é obrigatório.' });
    } else if (!id){
        console.log('ERRO: O id não foi fornecido.');
        return res.status(400).json({ mensagem: 'O campo "id" é obrigatório.' });
    }

    try {
        const comodoAtualizado = await ComodoModel.atualizar(Number(id), nome)

        if (comodoAtualizado){
            res.status(200).json(comodoAtualizado)
        }else{
            res.status(404).json({mensagem: 'Cômodo não encontrado'})
        }
    }catch (error){
        res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const deletarComodo = async (req: Request, res: Response) => {
    console.log('controller de deletar foi chamado')
    const {id} = req.params
    if (!id){
        console.log('Error: Id nao foi fornecido')
        res.status(400).json({mensagem: 'O campo "id" é obrigatório.'})
    }
    try {
        const comodoDeletado = await ComodoModel.deletar(Number(id))
        
        if (comodoDeletado){
            res.status(204).json(comodoDeletado)
        } else{
            res.status(404).json({mensagem: 'Cômodo não encontrado'})
        }
    }catch (error){
        res.status(500).json({mensagem: 'Erro interno no servidor'})
    }
}