import { expect, describe, it } from "vitest"

import { Brief } from "../../entities/brief"

type UUID = `${string}-${string}-${string}-${string}-${string}`;

describe('Brief entity', () => {
    it('can create a brief entity', () => {
    
        const brief = new Brief({
            imageUrl: 'www.banco.com/imagen.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: "John Doe"
        })

        expect(brief).toBeInstanceOf(Brief)

        expect(brief.id).toBeTypeOf("string")

        expect(brief.imageUrl).toBe('www.banco.com/imagen.jpg')

        expect(brief.description).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
    
        expect(brief.author).toBe('John Doe')
    
    });

    it('can update a brief entity through attributes set', () => {
        const brief = new Brief({
            imageUrl: 'www.banco.com/imagen.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: 'John Doe'
        })

        brief.attributes = {
            ...brief.attributes,
            imageUrl: 'www.banco.com/imagen2.jpg',
            author: 'Jane Doe'
        }

        expect(brief.imageUrl).toBe('www.banco.com/imagen2.jpg')

        expect(brief.author).toBe('Jane Doe')
    });
    
    it('throws an error when required attributes are missing', () => {
        expect(() => {
            new Brief({
                imageUrl: '',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                author: "John Doe"
            })
        }).toThrowError('imageUrl is required')
        
        expect(() => {
            new Brief({
                imageUrl: 'www.banco.com/imagen.jpg',
                description: '',
                author: "John Doe"
            })
        }).toThrowError('description is required')
    
        expect(() => {
            new Brief({
                imageUrl: 'www.banco.com/imagen.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                author: ''
            })
        }).toThrowError('author is required')
    });
});
