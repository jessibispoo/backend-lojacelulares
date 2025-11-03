"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banco_mongo_js_1 = require("../database/banco-mongo.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsuarioController {
    async adicionar(req, res) {
        const { nome, idade, email, senha } = req.body;
        if (!nome || !email || !senha || !idade) {
            return res.status(400).json({ mensagem: "Dados incompletos (nome,email,senha,idade)" });
        }
        const senhaCriptografada = await bcrypt_1.default.hash(senha, 10);
        const usuario = { nome, idade, email, senha: senhaCriptografada };
        const resultado = await banco_mongo_js_1.db.collection('usuarios')
            .insertOne(usuario);
        res.status(201).json({ ...usuario, _id: resultado.insertedId });
    }
    async listar(req, res) {
        const usuarios = await banco_mongo_js_1.db.collection('usuarios').find().toArray();
        res.status(200).json(usuarios);
    }
    async login(req, res) {
        //Recebe email e senha
        const { email, senha } = req.body;
        //Validação de email e senha
        if (!email || !senha)
            return res.status(400).json({ mensagem: "Email e senha são obrigatórios!" });
        //Verifica se o usuário e senha estão corretos no banco.
        const usuario = await banco_mongo_js_1.db.collection("usuarios").findOne({ email });
        if (!usuario)
            return res.status(400).json({ mensagem: "Usuário incorreto!" });
        const senhaValida = await bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida)
            return res.status(400).json({ mensagem: "Senha Inválida!" });
        //criar um TOKEN
        const token = jsonwebtoken_1.default.sign({ usuarioId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //Devolver token
        res.status(200).json({ token });
    }
}
exports.default = new UsuarioController();
