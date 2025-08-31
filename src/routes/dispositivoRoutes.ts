import { Router } from "express";
import { criarDispositivo } from '../controllers/dispositivoController.js'

const router = Router();

router.post('/', criarDispositivo );

export default router;
console.log('>>> O arquivo de rotas de cômodos foi carregado! <<<');  