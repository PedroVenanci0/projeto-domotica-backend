import { Router } from "express";
import {atualizarComodo, criarComodo, listarComodos} from "../controllers/comodoController.js"; // Deixei comentado

const router = Router();

router.get('/', listarComodos); 
router.post('/', criarComodo );
router.put('/:id', atualizarComodo);

export default router;
console.log('>>> O arquivo de rotas de cômodos foi carregado! <<<');