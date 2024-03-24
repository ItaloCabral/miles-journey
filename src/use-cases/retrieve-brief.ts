import { Brief } from "src/entities/brief";
import { BriefRepository } from "src/repositories/brief-repositories/repository";

type RetrieveBriefRequest = {
    id: string;
}

type RetrieveBriefResponse = Partial<Brief>;

export class RetrieveBriefUseCase {

    public constructor(
        private repository: BriefRepository
    ) {}

    async execute({ id }: RetrieveBriefRequest): Promise<RetrieveBriefResponse> {

        if(!id) throw new Error('id is required');

        const brief = await this.repository.find(id);

        if(!brief) throw new Error('Brief not found');

        return { ...brief.attributes };

    }

}
