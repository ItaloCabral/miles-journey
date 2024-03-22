import { Brief } from "src/entities/brief";
import { BriefRepository } from "src/repositories/brief-repositories/repository";

type UpdateBriefRequest = {
    id: string;
    data: {
        imageUrl: string;
        description: string;
        author: string;
    }
}

type UpdateBriefResponse = Brief;

export class UpdateBriefUseCase {

    public constructor(
        private repository: BriefRepository
    ) {}

    async execute({ id, data }: UpdateBriefRequest): Promise<UpdateBriefResponse> {

        if(!id) throw new Error('id is required');

        const brief = await this.repository.update(id, {
            imageUrl: data.imageUrl,
            description: data.description,
            author: data.author
        });

        if(!brief) throw new Error('Brief not found');

        return brief;

    }

}
