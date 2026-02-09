import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            auth: () => {
                userId: string | null;
                has: (permission: string) => boolean;
            };
            plan?: string;
            file: any;
        }
    }
}