import { describe, it, expect, expectTypeOf } from "vitest"
import { InMemoryBriefRepository } from "../../repositories/brief-repositories/implementations/in-memory";
import { CreateBriefUseCase } from "../../use-cases/create-brief";
import { ListBriefResponse, ListBriefUseCase } from "../../use-cases/list-brief";

describe('List all inserted briefs', () => {

    const setup = () => {
        const briefRepository = new InMemoryBriefRepository();

        const createBriefUseCase = new CreateBriefUseCase(briefRepository);
        const listBriefUseCase = new ListBriefUseCase(briefRepository);

        return {
            briefRepository,
            createBriefUseCase,
            listBriefUseCase
        }
    }

    it('returns all inserted briefs', async () => {
        const { createBriefUseCase, listBriefUseCase } = setup();

        await createBriefUseCase.execute({
            imageUrl: 'www.banco.com/image.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: 'John Doe'
        });

        await createBriefUseCase.execute({
            imageUrl: 'www.banco.com/image2.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: 'Jane Doe'
        });

        expect(() => listBriefUseCase.execute()).not.toThrowError();

        expectTypeOf(await listBriefUseCase.execute()).toEqualTypeOf({} as ListBriefResponse);

        expect((await listBriefUseCase.execute()).data.briefs[0].imageUrl).toEqual("www.banco.com/image.jpg");
        expect((await listBriefUseCase.execute()).data.briefs[0].description).toEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
        expect((await listBriefUseCase.execute()).data.briefs[0].author).toEqual("John Doe");

        expect((await listBriefUseCase.execute()).data.briefs[1].imageUrl).toEqual("www.banco.com/image2.jpg");
        expect((await listBriefUseCase.execute()).data.briefs[1].description).toEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
        expect((await listBriefUseCase.execute()).data.briefs[1].author).toEqual("Jane Doe");

    });

});
