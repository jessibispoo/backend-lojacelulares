"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const rotas_autenticadas_js_1 = __importDefault(require("./rotas/rotas-autenticadas.js"));
const rotas_nao_autenticadas_js_1 = __importDefault(require("./rotas/rotas-nao-autenticadas.js"));
const auth_js_1 = __importDefault(require("./middleware/auth.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(rotas_nao_autenticadas_js_1.default);
app.use(auth_js_1.default);
app.use(rotas_autenticadas_js_1.default);
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
