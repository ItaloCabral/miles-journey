import { NextFunction, Request, Response } from "express";
import { createBriefRequestValidation } from "../middlewares/brief-validation";
import { BriefRepository } from "../repositories/brief-repositories/repository";
import { CreateBriefUseCase } from "../use-cases/create-brief";

export class BriefController {

    public constructor(
        private Repository: BriefRepository
    ) {}

    async list(request: Request, response: Response, next: NextFunction) {
        try {

            const briefs = await this.Repository.list();

            response.status(200).json(briefs);

        }catch(error: any) {
            response.status(400).json({ error: error.message });
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {

            const { imageUrl, description, author } = request.body;

            createBriefRequestValidation(request, response, next);

            const createBriefUseCase = new CreateBriefUseCase(this.Repository);

            const savedBrief = await createBriefUseCase.execute({
                imageUrl,
                description,
                author
            });

            if(!savedBrief) throw new Error('Error saving brief');

            response.status(201).json({
                id: savedBrief.id
            });

        }catch(error: any) {
            response.status(400).json({ error: error.message });
        }
    }

}