import 'dotenv/config';
import express,{ Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import rotasNaoAutenticadas from './rotas/rotas-nao-autenticadas.js'
import rotasAutenticadas from './rotas/rotas-autenticadas.js'
import  Auth  from './middleware/auth.js';

import cors from 'cors'


const app = express()
app.use(cors())

app.use(express.json())


// Usando as rotas definidas em rotas.ts
app.use(rotasNaoAutenticadas)
app.use(Auth.verificarToken)
app.use(rotasAutenticadas)

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:admin123@lojacelulares.s2ux2hf.mongodb.net/lojacelulares")
  .then(() => console.log("✅ Conectado ao MongoDB Atlas 💗❤️😘😜"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));


// Criando o servidor na porta 8000 com o express
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})
//# sourceMappingURL=index-mongo.d.ts.map