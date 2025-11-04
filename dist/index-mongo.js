import 'dotenv/config';
import express from 'express';
import 'dotenv/config';
import rotasNaoAutenticadas from './rotas/rotas-nao-autenticadas.js';
import rotasAutenticadas from './rotas/rotas-autenticadas.js';
import Auth from './middleware/auth.js';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
// Usando as rotas definidas em rotas.ts
app.use(rotasNaoAutenticadas);
app.use(Auth.verificarToken);
app.use(rotasAutenticadas);
// Criando o servidor na porta 8000 com o express
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
//# sourceMappingURL=index-mongo.d.ts.map
//# sourceMappingURL=index-mongo.js.map