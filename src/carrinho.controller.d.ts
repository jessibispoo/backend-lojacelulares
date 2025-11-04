import type { Request, Response } from "express";
interface RequestAuth extends Request {
    usuarioId?: string;
}
declare class CarrinhoController {
    adicionarItem(req: RequestAuth, res: Response): Promise<Response<any, Record<string, any>>>;
    removerItem(req: RequestAuth, res: Response): Promise<Response<any, Record<string, any>>>;
    atualizarQuantidade(req: RequestAuth, res: Response): Promise<Response<any, Record<string, any>>>;
    listar(req: RequestAuth, res: Response): Promise<Response<any, Record<string, any>>>;
    remover(req: RequestAuth, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: CarrinhoController;
export default _default;
//# sourceMappingURL=carrinho.controller.d.ts.map