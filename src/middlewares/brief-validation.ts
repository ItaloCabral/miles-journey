import { NextFunction, Response, Request } from "express";
import { z as zod } from "zod";

export const createBriefRequestValidation = (request: Request, response: Response, next: NextFunction) => {
    const validationSchema = zod.object({
        imageUrl: zod.string(),
        description: zod.string(),
        author: zod.string()
    });

    try {
        validationSchema.parse(request.body);
        next();
    } catch(error: any) {
        response.status(400).json({ error: error.errors });
    }
}
