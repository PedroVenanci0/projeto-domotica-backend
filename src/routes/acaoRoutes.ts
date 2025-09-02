import { Router } from "express";
import { criarAcao, buscarAcaoPorId, atualizarAcao, deletarAcao } from '../controllers/acaoController.js';

const router = Router();

router.post('/:id_cena/acoes', criarAcao);
router.get('/:id_acao', buscarAcaoPorId);
router.patch('/:id_acao', atualizarAcao);
router.delete('/:id_acao', deletarAcao);

export default router;