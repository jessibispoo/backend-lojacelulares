import type { Request, Response, NextFunction } from 'express';
interface RequestAuth extends Request {
    usuarioId?: string;
}
declare function Auth(req: RequestAuth, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default Auth;
//# sourceMappingURL=auth.d.ts.map