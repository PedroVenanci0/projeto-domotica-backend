import { Router } from "express";
import { atualizarDispositivo, criarDispositivo, deletarDispositivo, listarDispositivos } from '../controllers/dispositivoController.js'

const router = Router();

router.get('/', listarDispositivos);
router.post('/', criarDispositivo );
router.patch('/:id', atualizarDispositivo);
router.delete('/:id', deletarDispositivo);

export default router;
console.log('>>> O arquivo de rotas de DISPOSITIVOS foi carregado! <<<');