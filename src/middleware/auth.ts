import express from "express";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../usuarios/usuario.controller.js"; // se for default export
import e from "express";
const SECRET = process.env.JWT_SECRET || "segredo";

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token não fornecido" });

    try {
        const decoded = jwt.verify(token, SECRET);
        (req as any).user = decoded; // se quiser evitar TS aqui
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido" });
    }
};
export default { verificarToken };
