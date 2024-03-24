import { NextFunction, Request, Response } from "express";
import { createBriefRequestValidation } from "../middlewares/brief-validation";
import { BriefRepository } from "../repositories/brief-repositories/repository";
import { CreateBriefUseCase } from "../use-cases/create-brief";
import { ListBriefUseCase } from "../use-cases/list-brief";
import { RetrieveBriefUseCase } from "../use-cases/retrieve-brief";
import { UpdateBriefUseCase } from "../use-cases/update-brief";

export class BriefController {

    public constructor(
        private repository: BriefRepository
    ) {}

    async list(request: Request, response: Response) {
        try {

            const listBriefUseCase = new ListBriefUseCase(this.repository);

            const requestParams = request.query ?? {};

            const briefs = await listBriefUseCase.execute(requestParams);

            response.status(200).json(briefs);

        }catch(error: any) {
            response.status(400).json({ error: error.message });
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {

            const { imageUrl, description, author } = request.body;

            createBriefRequestValidation(request, response, next);

            const createBriefUseCase = new CreateBriefUseCase(this.repository);

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

    async retrieve(request: Request, response: Response) {
        try {

            const { id } = request.params;

            if(!id) throw new Error('Brief not found');

            const retrieveBriefUseCase = new RetrieveBriefUseCase(this.repository);

            const brief = await retrieveBriefUseCase.execute({id});

            response.status(200).json(brief);

        }catch(error: any) {
            response.status(400).json({ error: error.message });
        }
    }

    async update(request: Request, response: Response) {
        try {

            const { id } = request.params;
            const { imageUrl, description, author } = request.body;

            if(!id) throw new Error('Brief not found');

            const updateBriefUseCase = new UpdateBriefUseCase(this.repository);

            const brief = await updateBriefUseCase.execute({
                id,
                data: {
                    imageUrl,
                    description,
                    author
                }
            });

            response.status(200).json(brief);

        }catch(error: any) {
            response.status(400).json({ error: error.message });
        }
    }

    async delete(request: Request, response: Response) {

        try {

            const { id } = request.params;

            if(!id) throw new Error('Brief not found');

            const brief = await this.repository.delete(id);

            if(!brief) throw new Error('Brief not found');

            response.status(204).json();

        }catch(error: any) {
            response.status(400).json({ error: error.message });
        }

    }

    // async populate(request: Request, response: Response){
    //     const defaultBriefs =  [
    //         {
    //           id: "8cdb80e6-7c1e-4cc3-ad5e-b83b22cec1de",
    //           imageUrl: "https://picsum.photos/640/640",
    //           description: "Sobre Gana: Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //           author: "Jack Doe",
    //           createdAt: "2024-03-23T22:30:07.558Z",
    //           updatedAt: "2024-03-23T22:30:07.558Z"
    //         },
    //         {
    //           id: "0851a056-cf02-4c0a-9795-bb5d5660e202",
    //           imageUrl: "https://picsum.photos/640/640",
    //           description: "Sobre Florida: Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //           author: "Jack Doe",
    //           createdAt: "2024-03-23T22:29:58.843Z",
    //           updatedAt: "2024-03-23T22:29:58.843Z"
    //         },
    //         {
    //           id: "8ae5f1de-9ba4-4a6c-b644-6d49b90d7aaf",
    //           imageUrl: "https://picsum.photos/640/640",
    //           description: "Sobre Buenos Aires: Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //           author: "John Doe",
    //           createdAt: "2024-03-23T22:29:44.450Z",
    //           updatedAt: "2024-03-23T22:29:44.450Z"
    //         },
    //         {
    //           id: "ba33312b-74d6-476b-bc12-d9426dd91352",
    //           imageUrl: "https://picsum.photos/640/640",
    //           description: "Sobre Punta Cana: Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //           author: "John Doe",
    //           createdAt: "2024-03-23T22:29:35.991Z",
    //           updatedAt: "2024-03-23T22:29:35.991Z"
    //         },
    //         {
    //           id: "d8510343-1a89-49ab-a351-e2e5334a5593",
    //           imageUrl: "https://picsum.photos/640/640",
    //           description: "Sobre La Formosa: Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //           author: "Jane Doe",
    //           createdAt: "2024-03-23T22:29:22.808Z",
    //           updatedAt: "2024-03-23T22:29:22.808Z"
    //         },
    //         {
    //           id: "aea862f4-f272-43d8-98d0-b4487891063c",
    //           imageUrl: "https://picsum.photos/640/640",
    //           description: "Sobre La Conquista: Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //           author: "Jane Doe",
    //           createdAt: "2024-03-23T22:29:13.381Z",
    //           updatedAt: "2024-03-23T22:29:13.381Z"
    //         }
    //     ];

    //     defaultBriefs.forEach(brief => {

    //         const newBrief = new Brief({
    //             ...brief,
    //             createdAt: new Date(brief.createdAt),
    //             updatedAt: new Date(brief.updatedAt)
    //         })

    //         this.repository.save(newBrief);
    //     });

    //     response.status(200).json({
    //         message: 'Briefs populated'
    //     });
    // }

}