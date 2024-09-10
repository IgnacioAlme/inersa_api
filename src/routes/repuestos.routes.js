import { Router } from "express";
import { getRepuestos, getRepuestosByCodigo, getRepuestosByMarcaAuto, getRepuestosByTipo, getRepuestosPair, loadRepuestos } from "../controllers/repuestos.controller.js";

const router = Router();

router.get('/repuestos/list', getRepuestos);
router.get('/repuestos/:codigo', getRepuestosByCodigo);
router.get('/repuestos/:marca_auto', getRepuestosByMarcaAuto);
router.get('/repuestos/:tipo', getRepuestosByTipo);
router.get('/repuestos', getRepuestosPair);
router.get('/repuestos/load', loadRepuestos);

export default router;