import { Router } from "express";
import {atualizarComodo, criarComodo, deletarComodo, listarComodos, listarSomenteUmComodo} from "../controllers/comodoController.js"; // Deixei comentado

const router = Router();

router.get('/', listarComodos); 
router.get('/:id', listarSomenteUmComodo);
router.post('/', criarComodo );
router.put('/:id', atualizarComodo);
router.delete('/:id', deletarComodo);

export default router;
console.log('>>> O arquivo de rotas de cômodos foi carregado! <<<');    