import { Brief } from "../entities/brief";
import { BriefRepository } from "../repositories/brief-repositories/repository";

type CreateBriefRequest = {
    imageUrl: string;
    description: string;
    author: string;
}

type CreateBriefResponse = {
    id: string;
}

export class CreateBriefUseCase {

    public constructor(
        private repository: BriefRepository
    ) {}

    async execute({ imageUrl, description, author }: CreateBriefRequest): Promise<CreateBriefResponse> {

        if (!imageUrl) throw new Error('imageUrl is required');

        if (!description) throw new Error('description is required');

        if (!author) throw new Error('author is required');

        const brief = new Brief({
            imageUrl,
            description,
            author
        });

        const savedBrief = await this.repository.save(brief);

        if(!savedBrief) throw new Error('Error saving brief');

        return {
            id: savedBrief.id!
        };

    }

}
