import { Router } from "express";
import { getClientes, getClienteByMatricula, updateClientes, deleteCliente, createCliente } from "../controllers/clientes.controller.js";

const router = Router();

router.get('/clientes', getClientes);
router.get('/clientes/:matricula', getClienteByMatricula);
router.post('/clientes', createCliente);
router.patch('/clientes/:matricula', updateClientes);
router.delete('/clientes/:matricula', deleteCliente);

export default router;