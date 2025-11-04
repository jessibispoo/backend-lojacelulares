import { Router, Request, Response } from "express";
import Usuario from "../usuarios/usuario.controller.js"; // ajuste o caminho conforme seu modelo
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = Router();
// rota de login
router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        // procura usuário pelo email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuário não encontrado!" });
        }
        // compara a senha enviada com a senha do banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha incorreta!" });
        }
        // cria o token JWT
        const token = jwt.sign({ usuarioId: usuario._id, tipo: usuario.tipo }, // payload
        process.env.JWT_SECRET, { expiresIn: "1d" } // expira em 1 dia
        );
        return res.json({
            token,
            tipo: usuario.tipo,
            nome: usuario.nome,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
});
export default router;
//# sourceMappingURL=usuario.controller.js.map