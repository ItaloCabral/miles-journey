import { describe, it, expect } from "vitest"
import { Brief } from "../../entities/brief";
import { InMemoryBriefRepository } from "../../repositories/brief-repositories/implementations/in-memory";
import { RetrieveBriefUseCase } from "../../use-cases/retrieve-brief";
import { CreateBriefUseCase } from "../../use-cases/create-brief";

describe('Retrieve brief use case using ID', () => {

    const setup = () => {
        const briefRepository = new InMemoryBriefRepository();

        const createBriefUseCase = new CreateBriefUseCase(briefRepository);

        const retrieveBriefUseCase = new RetrieveBriefUseCase(briefRepository);

        return {
            briefRepository,
            createBriefUseCase,
            retrieveBriefUseCase
        }
    }

    it('returns a brief when a valid ID is provided', async () => {
          
        const { createBriefUseCase, retrieveBriefUseCase, briefRepository } = setup();

        const response = await createBriefUseCase.execute({
            imageUrl: 'www.banco.com/imagen.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: 'John Doe'
        });

        const brief = await retrieveBriefUseCase.execute({
            id: response.id
        });

        expect(brief.id).toBe(response.id);

        expect(brief).toMatchObject({
            id: response.id,
            imageUrl: 'www.banco.com/imagen.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        } as Brief);

        expect(brief.author).toBe('John Doe');
    })

    it('throws an error when an invalid ID is provided', async () => {
        const { retrieveBriefUseCase } = setup();

        expect(async () => {
            await retrieveBriefUseCase.execute({
                id: ''
            });
        }).rejects.toThrowError('id is required');
    })

    it('throws an error when no brief is found', async () => {
        const { retrieveBriefUseCase } = setup();

        expect(async () => {
            await retrieveBriefUseCase.execute({
                id: 'invalid-id'
            });
        }).rejects.toThrowError('Brief not found');
    })

});
