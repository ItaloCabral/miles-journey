import { Brief } from "src/entities/brief";
import { BriefRepository } from "src/repositories/brief-repositories/repository";

type ListBriefRequest = {
    random?: boolean
}

export type ListBriefResponse = {
    data: {
        briefs: Partial<Brief>[]
    }
}

export class ListBriefUseCase {

    public constructor(
        private repository: BriefRepository
    ) {}

    async execute(request: ListBriefRequest): Promise<ListBriefResponse> {

        const random = request?.random ?? false;

        let briefs = await this.repository.list();

        if(random) briefs = briefs.sort(() => Math.random() - 0.5).slice(0, 3);

        const briefsCopy = briefs.map(brief => {
            return {
                ...brief.attributes
            }
        });

        return {
            data: {
                briefs: briefsCopy
            }
        }
    }
}