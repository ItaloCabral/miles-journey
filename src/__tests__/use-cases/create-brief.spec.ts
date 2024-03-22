import { it, expect, describe } from "vitest"
import { InMemoryBriefRepository } from "../../repositories/brief-repositories/implementations/in-memory";
import { CreateBriefUseCase } from "../../use-cases/create-brief";

describe('Create brief use case', () => {

    const setup = () => {
        const briefRepository = new InMemoryBriefRepository();

        const createBriefUseCase = new CreateBriefUseCase(briefRepository);

        return {
            briefRepository,
            createBriefUseCase
        }
    }

    it('can create a brief and store it on database', async () => {

        const { createBriefUseCase, briefRepository } = setup();

        const response = await createBriefUseCase.execute({
            imageUrl: 'www.banco.com/imagen.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: "John Doe"
        })

        expect(response.id).toBeTypeOf("string");

        const brief = await briefRepository.find(response.id);

        expect(brief!.author).toBe("John Doe");

    });

    it('throws an error when required attributes are missing', () => {
        const { createBriefUseCase } = setup();

        expect(async () => {
            await createBriefUseCase.execute({
                imageUrl: '',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                author: "John Doe"
            })
        }).rejects.toThrowError();

        expect(async () => {
            await createBriefUseCase.execute({
                imageUrl: 'www.banco.com/imagen.jpg',
                description: '',
                author: "John Doe"
            })
        }).rejects.toThrowError();

        expect(async () => {
            await createBriefUseCase.execute({
                imageUrl: 'www.banco.com/imagen.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                author: ''
            })
        }).rejects.toThrowError();
    });



});
