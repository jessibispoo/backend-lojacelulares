//parte 
import mongoose from "mongoose";

//parte manu
import express from "express";
import cors from "cors";
import produtoRoutes from "./rotas/produto.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(produtoRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 8000");
});
