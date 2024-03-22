import { Brief } from "src/entities/brief";
import { BriefRepository } from "src/repositories/brief-repositories/repository";

type ListBriefRequest = {

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

    async execute(): Promise<ListBriefResponse> {

        const briefs = await this.repository.list();

        return {
            data: {
                briefs
            }
        }
    }
}