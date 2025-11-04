import express from "express";
import cors from "cors";
//importar rota de login 
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API rodando com TypeScript no Render!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
app.use(express.json());
//app.use("/api", loginRotas);
export default app;
//# sourceMappingURL=server.js.map