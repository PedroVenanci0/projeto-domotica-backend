import type { Request, Response } from 'express';
import { ComodoModel } from '../models/comodoModel.js';

const comadosfalsos = [
    { id: 1, nome: "Sala de Estar", dispositivos: [] },
    { id: 2, nome: "Cozinha", dispositivos: [] },
    { id: 3, nome: "Quarto Casal", dispositivos: [] }
]

export const listarComodos = async (req: Request, res: Response) => {
    try {
        const todosOsComodos = await ComodoModel.listar();
        
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

