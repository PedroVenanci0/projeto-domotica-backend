import { Router } from "express";
import {atualizarComodo, criarComodo, deletarComodo, listarComodos} from "../controllers/comodoController.js"; // Deixei comentado

const router = Router();

router.get('/', listarComodos); 
router.post('/', criarComodo );
router.put('/:id', atualizarComodo);
router.delete('/:id', deletarComodo);

export default router;
console.log('>>> O arquivo de rotas de cômodos foi carregado! <<<');    