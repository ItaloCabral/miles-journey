import { randomUUID } from 'node:crypto';

type BriefAttributes = {
    id?: string;
    imageUrl: string;
    description: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Brief {

    private _attributes: BriefAttributes;

    constructor(attributes: BriefAttributes) {

        if (!attributes.imageUrl) throw new Error('imageUrl is required');

        if (!attributes.description) throw new Error('description is required')
        
        if (!attributes.author) throw new Error('author is required')

        this._attributes = {
            id: randomUUID(),
            ...attributes,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    get attributes() {
        return this._attributes;
    }

    get id() {
        return this.attributes.id;
    }

    get imageUrl() {
        return this.attributes.imageUrl;
    }

    get description() {
        return this.attributes.description;
    }

    get author() {
        return this.attributes.author;
    }

    set attributes(attributes: Partial<BriefAttributes>) {
        this._attributes = {
            ...this.attributes,
            imageUrl: attributes.imageUrl || 'default-image-url',
            description: attributes.description || 'default-description',
            author: attributes.author || 'Anonymous',
            updatedAt: new Date()
        };
    }

}
