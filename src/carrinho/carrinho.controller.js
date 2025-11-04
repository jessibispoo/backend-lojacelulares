import { ObjectId } from "mongodb";
import { db } from "../database/banco-mongo";
class CarrinhoController {
    async adicionarItem(req, res) {
        try {
            const { produtoId, quantidade } = req.body;
            const usuarioId = req.usuarioId;
            if (!usuarioId) {
                return res.status(401).json({ mensagem: "Usuário não autenticado" });
            }
            if (!produtoId || !quantidade || quantidade <= 0) {
                return res.status(400).json({ mensagem: "Dados inválidos" });
            }
            const produto = await db.collection('produtos')
                .findOne({ _id: ObjectId.createFromHexString(produtoId) });
            if (!produto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }
            const carrinho = await db.collection("carrinhos")
                .findOne({ usuarioId });
            if (!carrinho) {
                const novoCarrinho = {
                    usuarioId,
                    itens: [{
                            produtoId,
                            quantidade,
                            precoUnitario: produto.preco,
                            nome: produto.nome
                        }],
                    dataAtualizacao: new Date(),
                    total: produto.preco * quantidade
                };
                const resposta = await db.collection("carrinhos")
                    .insertOne(novoCarrinho);
                return res.status(201).json({
                    ...novoCarrinho,
                    _id: resposta.insertedId
                });
            }
            const itemExistente = carrinho.itens
                .find(item => item.produtoId === produtoId);
            if (itemExistente) {
                itemExistente.quantidade += quantidade;
            }
            else {
                carrinho.itens.push({
                    produtoId,
                    quantidade,
                    precoUnitario: produto.preco,
                    nome: produto.nome
                });
            }
            carrinho.total = carrinho.itens.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);
            carrinho.dataAtualizacao = new Date();
            await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });
            return res.status(200).json(carrinho);
        }
        catch (error) {
            console.error('Erro ao adicionar item:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
    async removerItem(req, res) {
        try {
            const { produtoId } = req.body;
            const usuarioId = req.usuarioId;
            if (!usuarioId) {
                return res.status(401).json({ mensagem: "Usuário não autenticado" });
            }
            const carrinho = await db.collection("carrinhos")
                .findOne({ usuarioId });
            if (!carrinho) {
                return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
            }
            const filtrados = carrinho.itens.filter(item => item.produtoId !== produtoId);
            if (filtrados.length === carrinho.itens.length) {
                return res.status(404).json({ mensagem: 'Item não encontrado' });
            }
            const total = filtrados.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);
            await db.collection("carrinhos").updateOne({ usuarioId }, {
                $set: {
                    itens: filtrados,
                    total,
                    dataAtualizacao: new Date()
                }
            });
            return res.status(200).json({
                usuarioId,
                itens: filtrados,
                total,
                dataAtualizacao: new Date()
            });
        }
        catch (error) {
            console.error('Erro ao remover item:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
    async atualizarQuantidade(req, res) {
        try {
            const { produtoId, quantidade } = req.body;
            const usuarioId = req.usuarioId;
            if (!usuarioId) {
                return res.status(401).json({ mensagem: "Usuário não autenticado" });
            }
            if (!quantidade || quantidade <= 0) {
                return res.status(400).json({ mensagem: "Quantidade inválida" });
            }
            const carrinho = await db.collection("carrinhos")
                .findOne({ usuarioId });
            if (!carrinho) {
                return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
            }
            const item = carrinho.itens.find(item => item.produtoId === produtoId);
            if (!item) {
                return res.status(404).json({ mensagem: 'Item não encontrado' });
            }
            item.quantidade = quantidade;
            carrinho.total = carrinho.itens.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);
            carrinho.dataAtualizacao = new Date();
            await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });
            return res.status(200).json(carrinho);
        }
        catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
    async listar(req, res) {
        try {
            const usuarioId = req.usuarioId;
            if (!usuarioId) {
                return res.status(401).json({ mensagem: "Usuário não autenticado" });
            }
            const carrinho = await db.collection("carrinhos")
                .findOne({ usuarioId });
            if (!carrinho) {
                return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
            }
            return res.status(200).json(carrinho);
        }
        catch (error) {
            console.error('Erro ao listar carrinho:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
    async remover(req, res) {
        try {
            const usuarioId = req.usuarioId;
            if (!usuarioId) {
                return res.status(401).json({ mensagem: "Usuário não autenticado" });
            }
            const resultado = await db.collection("carrinhos")
                .deleteOne({ usuarioId });
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ mensagem: 'Carrinho não encontrado' });
            }
            return res.status(200).json({ mensagem: 'Carrinho removido com sucesso' });
        }
        catch (error) {
            console.error('Erro ao remover carrinho:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}
export default new CarrinhoController();
//# sourceMappingURL=carrinho.controller.js.map