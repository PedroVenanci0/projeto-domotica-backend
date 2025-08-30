import { Router } from "express";
import {criarComodo, listarComodos} from "../controllers/comodoController.js"; // Deixei comentado

const router = Router();

router.get('/', listarComodos); 
router.post('/', criarComodo );

export default router;
console.log('>>> O arquivo de rotas de cômodos foi carregado! <<<');