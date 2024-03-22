import { BriefRepository } from "src/repositories/brief-repositories/repository";

type DeleteBriefRequest = {
    id: string;
}

type DeleteBriefResponse = boolean;

export class DeleteBriefUseCase {

    public constructor(
        private repository: BriefRepository
    ) {}

    async execute({ id }: DeleteBriefRequest): Promise<DeleteBriefResponse> {

        if(!id) throw new Error('id is required');

        try {

            const brief = await this.repository.delete(id);

            return brief;

        } catch (error) {

            return false;

        }


    }

}
