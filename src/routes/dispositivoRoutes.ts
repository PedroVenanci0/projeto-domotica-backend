import { Router } from "express";
import { criarDispositivo, listarDispositivos } from '../controllers/dispositivoController.js'

const router = Router();

router.get('/', listarDispositivos);
router.post('/', criarDispositivo );

export default router;
console.log('>>> O arquivo de rotas de cômodos foi carregado! <<<');  