"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const banco_mongo_js_1 = require("../database/banco-mongo.js");
class CarrinhoController {
    //adicionarItem
    async adicionarItem(req, res) {
        const { produtoId, quantidade } = req.body;
        const usuarioId = req.usuarioId;
        if (!usuarioId)
            return res.status(401).json({ mensagem: "Token não foi passado para adicionar no carrinho" });
        //Buscar o produto no banco de dados
        const produto = await banco_mongo_js_1.db.collection('produtos')
            .findOne({ _id: bson_1.ObjectId.createFromHexString(produtoId) });
        if (!produto)
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        //Pegar o preço do produto
        //Pegar o nome do produto
        const nomeProduto = produto.nome;
        const precoProduto = produto.preco;
        // Verificar se um carrinho com o usuário já existe
        const carrinho = await banco_mongo_js_1.db.collection("carrinhos").findOne({ usuarioId: usuarioId });
        if (!carrinho) {
            const novoCarrinho = {
                usuarioId: usuarioId,
                itens: [{
                        produtoId: produtoId,
                        quantidade: quantidade,
                        precoUnitario: precoProduto,
                        nome: nomeProduto
                    }],
                dataAtualizacao: new Date(),
                total: precoProduto * quantidade
            };
            const resposta = await banco_mongo_js_1.db.collection("carrinhos").insertOne(novoCarrinho);
            const carrinhoResposta = {
                usuarioId: novoCarrinho.usuarioId,
                itens: novoCarrinho.itens,
                dataAtualizacao: novoCarrinho.dataAtualizacao,
                total: novoCarrinho.total,
                _id: resposta.insertedId
            };
            //return res.status(201).json({...novoCarrinho, _id: resposta.insertedId});
            //Early Return
            return res.status(201).json(carrinhoResposta);
        }
        //ELSE
        // Se existir, deve adicionar o item ao carrinho existente
        const itemExistente = carrinho.itens.find(item => item.produtoId === produtoId);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            carrinho.total += precoProduto * quantidade;
            carrinho.dataAtualizacao = new Date();
        }
        else {
            carrinho.itens.push({
                produtoId: produtoId,
                quantidade: quantidade,
                precoUnitario: precoProduto,
                nome: nomeProduto
            });
            carrinho.total += precoProduto * quantidade;
            carrinho.dataAtualizacao = new Date();
        }
        // Atualizar o carrinho no banco de dados
        await banco_mongo_js_1.db.collection("carrinhos").updateOne({ usuarioId: usuarioId }, { $set: {
                itens: carrinho.itens,
                total: carrinho.total,
                dataAtualizacao: carrinho.dataAtualizacao
            }
        });
        res.status(200).json(carrinho);
    }
    async removerItem(req, res) {
        const { produtoId, usuarioId } = req.body;
        //Faça o removerItem
        //Do melhor jeito
        const carrinho = await banco_mongo_js_1.db.collection("carrinhos").findOne({ usuarioId: usuarioId });
        if (!carrinho) {
            return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
        }
        const itemExistente = carrinho.itens.find(item => item.produtoId === produtoId);
        if (!itemExistente) {
            return res.status(404).json({ mensagem: 'Item não encontrado' });
        }
        const filtrados = carrinho.itens.filter(item => item.produtoId !== produtoId);
        const total = filtrados.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);
        const carrinhoAtualizado = {
            usuarioId: carrinho.usuarioId,
            itens: filtrados,
            dataAtualizacao: new Date(),
            total: total
        };
        await banco_mongo_js_1.db.collection("carrinhos").updateOne({ usuarioId: usuarioId }, { $set: {
                itens: carrinhoAtualizado.itens,
                total: carrinhoAtualizado.total,
                dataAtualizacao: carrinhoAtualizado.dataAtualizacao
            }
        });
        return res.status(200).json(carrinhoAtualizado);
    }
    async atualizarQuantidade(req, res) {
        const { produtoId, usuarioId, quantidade } = req.body;
        const carrinho = await banco_mongo_js_1.db.collection("carrinhos").findOne({ usuarioId: usuarioId });
        if (!carrinho) {
            return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
        }
        const itemExistente = carrinho.itens.find(item => item.produtoId === produtoId);
        if (!itemExistente) {
            return res.status(404).json({ mensagem: 'Item não encontrado' });
        }
        itemExistente.quantidade = quantidade;
        carrinho.total = carrinho.itens.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);
        carrinho.dataAtualizacao = new Date();
        await banco_mongo_js_1.db.collection("carrinhos").updateOne({ usuarioId: usuarioId }, { $set: {
                itens: carrinho.itens,
                total: carrinho.total,
                dataAtualizacao: carrinho.dataAtualizacao
            }
        });
        return res.status(200).json(carrinho);
    }
    async listar(req, res) {
        const { usuarioId } = req.body;
        const carrinho = await banco_mongo_js_1.db.collection("carrinhos").findOne({ usuarioId: usuarioId });
        if (!carrinho) {
            return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
        }
        return res.status(200).json(carrinho);
    }
    async remover(req, res) {
        const { usuarioId } = req.body;
        const carrinho = await banco_mongo_js_1.db.collection("carrinhos").findOne({ usuarioId: usuarioId });
        if (!carrinho) {
            return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
        }
        await banco_mongo_js_1.db.collection("carrinhos").deleteOne({ usuarioId: usuarioId });
        return res.status(200).json({ mensagem: 'Carrinho removido com sucesso' });
    }
}
exports.default = new CarrinhoController();
