"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_controller_js_1 = __importDefault(require("../usuarios/usuario.controller.js"));
const produto_controller_js_1 = __importDefault(require("../produtos/produto.controller.js"));
const express_1 = require("express");
const carrinho_controller_js_1 = __importDefault(require("../carrinho/carrinho.controller.js"));
const rotasAutenticadas = (0, express_1.Router)();
//Criando rotasAutenticadas para os usuários
rotasAutenticadas.post("/usuarios", usuario_controller_js_1.default.adicionar);
rotasAutenticadas.get("/usuarios", usuario_controller_js_1.default.listar);
//rotasAutenticadas para produtos
rotasAutenticadas.post("/produtos", produto_controller_js_1.default.adicionar);
rotasAutenticadas.get("/produtos", produto_controller_js_1.default.listar);
//Ainda vamos ter que criar as rotasAutenticadas para carrinho e produtos
rotasAutenticadas.post("/adicionarItem", carrinho_controller_js_1.default.adicionarItem);
//Tarefa para casa :)
exports.default = rotasAutenticadas;
