import { Router } from "express";
import {listarCenas, criarCena, listarSomenteUmaCena, atualizarCena, deletarCena, executarCena} from '../controllers/cenaController.js';
import { criarAcao } from "../controllers/acaoController.js";

const router = Router();

router.get('/', listarCenas);
router.post('/', criarCena);
router.get('/:id', listarSomenteUmaCena);
router.patch('/:id', atualizarCena);
router.delete('/:id', deletarCena);

router.post('/:id_cena/acoes', criarAcao);

router.put('/:id/executar', executarCena);

export default router;