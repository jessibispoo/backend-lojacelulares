//parte manu
import { Router } from "express";
import ProdutoController from "../produtos/produto.controller.js";

const router = Router();

router.get("/produtos", ProdutoController.listar);
router.post("/produtos", ProdutoController.adicionar);

export default router;

