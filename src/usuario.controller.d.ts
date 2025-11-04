import { Request, Response } from "express";
declare class UsuarioController {
    adicionar(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    listar(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: UsuarioController;
export default _default;
//# sourceMappingURL=usuario.controller.d.ts.map