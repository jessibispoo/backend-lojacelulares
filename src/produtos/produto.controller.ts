import type { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { db } from '../database/banco-mongo.js';

interface Celular {
    nome: string;
    preco: number;
    descricao: string;
    urlfoto: string;
}

// ...rest of your existing code...

class ProdutoController {
    async listar(req: Request, res: Response) {
        try {
            const produtos = await db.collection('produtos').find().toArray();
            
            if (!produtos || produtos.length === 0) {
                return res.status(404).json({
                    erro: true,
                    mensagem: "Nenhum produto encontrado"
                });
            }

            return res.status(200).json({
                erro: false,
                produtos: produtos
            });

        } catch (erro) {
            console.error('Erro ao listar produtos:', erro);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro interno do servidor"
            });
        }
    }

    async adicionar(req: Request, res: Response) {
        try {
            const novoProduto: Celular = req.body;

            // Validação dos dados
            if (!novoProduto.nome || !novoProduto.preco || !novoProduto.descricao || !novoProduto.urlfoto) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Dados incompletos. Todos os campos são obrigatórios"
                });
            }

            if (novoProduto.preco <= 0) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "O preço deve ser maior que zero"
                });
            }

            const resultado = await db.collection('produtos').insertOne(novoProduto);

            if (!resultado.acknowledged) {
                return res.status(500).json({
                    erro: true,
                    mensagem: "Erro ao inserir produto no banco de dados"
                });
            }

            const produtoInserido = await db.collection('produtos').findOne({ 
                _id: resultado.insertedId 
            });

            return res.status(201).json({
                erro: false,
                mensagem: "Produto adicionado com sucesso",
                produto: produtoInserido
            });

        } catch (erro) {
            console.error('Erro ao adicionar produto:', erro);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro interno do servidor"
            });
        }
    }

    async adicionarVarios(req: Request, res: Response) {
        try {
            const celulares: Celular[] = [
                // ...existing code with celulares array...
            ];

            // Validação básica dos dados
            const dadosValidos = celulares.every(celular => 
                celular.nome && 
                celular.preco > 0 && 
                celular.descricao && 
                celular.urlfoto
            );

            if (!dadosValidos) {
                return res.status(400).json({ 
                    erro: true, 
                    mensagem: "Dados inválidos em um ou mais celulares" 
                });
            }

            const resposta = await db.collection('produtos').insertMany(celulares);

            if (!resposta.acknowledged) {
                return res.status(500).json({ 
                    erro: true, 
                    mensagem: "Erro ao inserir produtos no banco de dados" 
                });
            }

            return res.status(201).json({ 
                erro: false,
                mensagem: "10 celulares adicionados com sucesso!", 
                ids: resposta.insertedIds 
            });

        } catch (erro) {
            console.error('Erro ao adicionar celulares:', erro);
            return res.status(500).json({ 
                erro: true, 
                mensagem: "Erro interno do servidor" 
            });
        }
    }
}
import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: String,
  imagem: String
});

export const Produto = mongoose.model("Produto", produtoSchema);


export default new ProdutoController();