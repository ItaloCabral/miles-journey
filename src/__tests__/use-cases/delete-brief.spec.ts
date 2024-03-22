import { describe, it, expect } from "vitest"
import { InMemoryBriefRepository } from "../../repositories/brief-repositories/implementations/in-memory";
import { CreateBriefUseCase } from "../../use-cases/create-brief";
import { DeleteBriefUseCase } from "../../use-cases/delete-brief";

describe('Delete brief using a valid id', () => {

    const setup = () => {
        const briefRepository = new InMemoryBriefRepository();

        const createBriefUseCase = new CreateBriefUseCase(briefRepository);

        const deleteBriefUseCase = new DeleteBriefUseCase(briefRepository);

        return {
            briefRepository,
            createBriefUseCase,
            deleteBriefUseCase
        }
    }

    it('returns true when a valid ID is provided', async () => {
          
        const { createBriefUseCase, deleteBriefUseCase, briefRepository } = setup();

        const response = await createBriefUseCase.execute({
            imageUrl: 'www.banco.com/imagen.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: 'John Doe'
        });

        expect(
            await deleteBriefUseCase.execute({ id: response.id })
        ).toBe(true);

        expect(await briefRepository.find(response.id)).toBe(null);

    });

    it('throws an error when an invalid ID is provided', async () => {
        const { deleteBriefUseCase } = setup();

        expect(async () => {
            await deleteBriefUseCase.execute({ id: '' })
        }).rejects.toThrowError('id is required');
    });

    it('throws an error when no brief is found', async () => {
        const { deleteBriefUseCase } = setup();

        console.log(await deleteBriefUseCase.execute({ id: 'invalid-id' }));

        expect(
            await deleteBriefUseCase.execute({
                id: 'invalid-id'
            })
        ).toBe(false);
    })

});
