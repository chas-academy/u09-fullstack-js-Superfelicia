import { NextFunction, Request, Response } from "express"

export const roleMiddleware = (requireRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!user.roles || !user.roles.includes(requireRole)) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        next();
    }
}