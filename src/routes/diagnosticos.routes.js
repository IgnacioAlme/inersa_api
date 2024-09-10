import { Router } from "express";
import { getDiagnosticos, getDiagnosticosByMatricula, createDiagnostico, updateDiagnostico, deleteDiagnostico } from "../controllers/diagnosticos.controller.js";

const router = Router();

router.get('/diagnosticos', getDiagnosticos);
router.get('/diagnosticos/:matricula', getDiagnosticosByMatricula);
router.get('/diagnosticos/', createDiagnostico);
router.get('/diagnosticos/:id', updateDiagnostico);
router.get('/diagnosticos/:id', deleteDiagnostico);


export default router;