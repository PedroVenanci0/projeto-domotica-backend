import type { Request, Response } from "express";
import { CenaModel } from "../models/cenaModel.js";
import { dispositivoModel } from "../models/dispositivoModel.js";

const esperar = (segundos: number) => new Promise(resolve => setTimeout(resolve, segundos * 1000));

export const criarCena = async (req: Request, res: Response) => {
    const {nome} = req.body

    if (!nome){
        console.log('Error id nao encontrado')
        res.status(400).json({mensagem: 'Error campo nome é obrigatorio'})
    }
    try{
        const novaCena = await CenaModel.criar(nome);
        res.status(201).json(novaCena);
    } catch (error) {
        console.error('Erro no controller ao Criar Cena:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

export const listarCenas = async (req: Request, res: Response) => {
    try {
        const todasAsCenas = await CenaModel.listarTodos;
        
        res.status(200).json(todasAsCenas);

    } catch (error) {
        console.error('Erro no controller ao listar cenas:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const listarSomenteUmaCena = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const unicaCena = await CenaModel.listarSomenteUm(Number(id))
        res.status(200).json(unicaCena);

    } catch (error) {
        console.error('Erro no controller ao listar cenas:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const atualizarCena = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const camposParaAtualizar: { nome_cena?: string; ativo?: boolean } = {};

    if (req.body.nome_cena) {
        camposParaAtualizar.nome_cena = req.body.nome_cena;
    }

    if (req.body.ativo !== undefined) {
        camposParaAtualizar.ativo = req.body.ativo;
    }

    if (Object.keys(camposParaAtualizar).length === 0) {
        return res.status(400).json({ mensagem: 'Nenhum campo válido para atualização foi fornecido.' });
    }

    try {
        const cenaAtualizada = await CenaModel.atualizar(Number(id), camposParaAtualizar);

        if (cenaAtualizada) {
            res.status(200).json(cenaAtualizada);
        } else {
            res.status(404).json({ mensagem: 'Cena não encontrada.' });
        }
    } catch (error) {
        console.error('Erro no controller ao atualizar cena:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const deletarCena = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const cenaDeletada = await CenaModel.deletar(Number(id));

        if (cenaDeletada) {
            res.status(204).send();
        } else {
            res.status(404).json({ mensagem: 'Cena não encontrada.' });
        }
    } catch (error) {
        console.error('Erro no controller ao deletar cena:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const executarCena = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // 1. Busca a cena e suas ações no banco de dados
        const cenaParaExecutar = await CenaModel.listarSomenteUm(Number(id));

        // 2. Validações
        if (!cenaParaExecutar) {
            return res.status(404).json({ mensagem: 'Cena não encontrada.' });
        }
        if (!cenaParaExecutar.ativo) {
            return res.status(409).json({ mensagem: 'Esta cena está desativada.' }); // 409 Conflict
        }

        // 3. Envia uma resposta imediata para o frontend
        res.status(202).json({ mensagem: 'Execução da cena iniciada.' });

        // 4. Inicia a execução das ações em segundo plano
        // Usamos uma função anônima auto-executável para não travar a resposta
        (async () => {
            for (const acao of cenaParaExecutar.acoes) {
                // 5. Espera o intervalo de tempo definido na ação
                await esperar(acao.intervalo_segundos);

                // 6. Executa a atualização no dispositivo
                console.log(`Executando ação: Dispositivo ${acao.dispositivo.id_dispositivo} -> estado ${acao.dispositivo.estado_desejado}`);
                await dispositivoModel.atualizar(
                    acao.dispositivo.id_dispositivo, 
                    { estado: acao.dispositivo.estado_desejado }
                );
            }
            console.log(`Cena "${cenaParaExecutar.nome_cena}" finalizada.`);
        })();

    } catch (error) {
        console.error('Erro no controller ao executar cena:', error);
        if (!res.headersSent) {
            res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}


