"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Explicando o que é um middleware
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ mensagem: "Token não fornecido!" });
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ mensagem: "Token inválido!" });
        }
        if (typeof decoded === "string" || !decoded || !("usuarioId" in decoded))
            return res.status(401).json({ mensagem: "Payload inválido!" });
        req.usuarioId = decoded.usuarioId;
        next();
    });
}
exports.default = Auth;
