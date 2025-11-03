"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const banco_mongo_js_1 = require("../database/banco-mongo.js");
class ProdutoController {
    async adicionar(req, res) {
        const { nome, preco, descricao, urlfoto } = req.body;
        const produto = { nome, preco, descricao, urlfoto };
        const resposta = await banco_mongo_js_1.db.collection('produtos').insertOne(produto);
        res.status(201).json({ ...produto, _id: resposta.insertedId });
    }
    async listar(req, res) {
        const produtos = await banco_mongo_js_1.db.collection('produtos').find().toArray();
        res.status(200).json(produtos);
    }
}
exports.default = new ProdutoController();
