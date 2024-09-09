import { Router } from "express";
import { getRepuestos, loadRepuestos } from "../controllers/repuestos.controller.js";

const router = Router();

router.get('/repuestos', getRepuestos);
router.get('/repuestos/load', loadRepuestos);

export default router;