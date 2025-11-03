"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_controller_js_1 = __importDefault(require("../usuarios/usuario.controller.js"));
const express_1 = require("express");
const rotasNaoAutenticadas = (0, express_1.Router)();
rotasNaoAutenticadas.post("/login", usuario_controller_js_1.default.login);
exports.default = rotasNaoAutenticadas;
