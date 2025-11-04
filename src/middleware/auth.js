import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../usuarios/usuario.controller.js";
const router = express.Router();
const SECRET = process.env.JWT_SECRET || "segredo";
//middleware de autenticação
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        //
        req.user = decoded; // guarda o usuário decodificado (id, tipo, etc.)
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
//rota de login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario)
            return res.status(401).json({ message: "Usuário não encontrado" });
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida)
            return res.status(401).json({ message: "Senha incorreta" });
        const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, SECRET, { expiresIn: "1d" });
        res.json({
            token,
            tipo: usuario.tipo,
        });
    }
    catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro interno no login" });
    }
});
//exemplo de rota protegida
router.get("/perfil", authMiddleware, async (req, res) => {
    //
    const { id } = req.user;
    const usuario = await Usuario.findById(id).select("-senha");
    res.json(usuario);
});
export default router;
//# sourceMappingURL=auth.js.map