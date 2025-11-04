import { Request, Response } from 'express';
declare class ProdutoController {
    adicionar(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    listar(req: Request, res: Response): Promise<void>;
    buscarPorId(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    atualizar(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deletar(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: ProdutoController;
export default _default;
//# sourceMappingURL=produto.controller.d.ts.map