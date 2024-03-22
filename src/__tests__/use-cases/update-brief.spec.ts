import { it, expect, describe } from "vitest"
import { InMemoryBriefRepository } from "../../repositories/brief-repositories/implementations/in-memory";
import { CreateBriefUseCase } from "../../use-cases/create-brief";
import { UpdateBriefUseCase } from "../../use-cases/update-brief";

describe('Update brief use case', () => {

    const setup = () => {
        const briefRepository = new InMemoryBriefRepository();

        const createBriefUseCase = new CreateBriefUseCase(briefRepository);

        const updateBriefUseCase = new UpdateBriefUseCase(briefRepository);

        return {
            briefRepository,
            createBriefUseCase,
            updateBriefUseCase
        }
    }

    it('can update a brief and store it on database', async () => {
            
        const { createBriefUseCase, updateBriefUseCase } = setup();

        const response = await createBriefUseCase.execute({
            imageUrl: 'www.banco.com/imagen.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: 'John Doe'
        })

        const brief = await updateBriefUseCase.execute({
            id: response.id,
            data: {
                imageUrl: 'www.banco.com/imagen2.jpg',
                description: 'ipsum dolor sit amet, Lorem consectetur adipiscing elit',
                author: 'Jane Doe'
            }
        });

        expect(brief.id).toBe(response.id);

        expect(brief).toMatchObject({
            id: response.id,
            imageUrl: 'www.banco.com/imagen2.jpg',
            description: 'ipsum dolor sit amet, Lorem consectetur adipiscing elit',
        });
    })

    it('throws an error when required attributes are missing', () => {
        const { updateBriefUseCase } = setup();

        expect(async () => {
            await updateBriefUseCase.execute({
                id: '',
                data: {
                    imageUrl: 'www.banco.com/imagen.jpg',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    author: 'Jane Doe'
                }
            });
        }).rejects.toThrowError('id is required');
    })

    it('throws an error when no brief is found', () => {
        const { updateBriefUseCase } = setup();

        expect(async () => {
            await updateBriefUseCase.execute({
                id: 'invalid-id',
                data: {
                    imageUrl: 'www.banco.com/imagen.jpg',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    author: 'Jane Doe'
                }
            });
        }).rejects.toThrowError('Brief not found');
    })

})
