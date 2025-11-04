//A3 → Criar página de listagem de produtos (2 pts) parte da manu//
import { Request, Response } from 'express';
import { db } from '../database/banco-mongo.js';
class ProdutoController {
    async adicionar(req, res) {
        try {
            const { nome, preco, descricao, urlfoto } = req.body;
            // Validação básica
            if (!nome || !preco || !descricao || !urlfoto) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }
            const produto = { nome, preco, descricao, urlfoto, createdAt: new Date() };
            const resposta = await db.collection('produtos').insertOne(produto);
            res.status(201).json({ ...produto, _id: resposta.insertedId });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar produto' });
        }
    }
    async listar(req, res) {
        try {
            const produtos = await db.collection('produtos')
                .find()
                .sort({ createdAt: -1 })
                .toArray();
            res.status(200).json(produtos);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await db.collection('produtos').findOne({ _id: id });
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(produto);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, descricao, urlfoto } = req.body;
            const resultado = await db.collection('produtos').updateOne({ _id: id }, { $set: { nome, preco, descricao, urlfoto, updatedAt: new Date() } });
            if (resultado.matchedCount === 0) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await db.collection('produtos').deleteOne({ _id: id });
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto removido com sucesso' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}
export default new ProdutoController();
//# sourceMappingURL=produto.controller.js.map