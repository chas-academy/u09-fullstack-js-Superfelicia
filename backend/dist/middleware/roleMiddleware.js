"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (requireRole) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!user.roles || !user.roles.includes(requireRole)) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
