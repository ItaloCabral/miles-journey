import { Brief } from "src/entities/brief";
import { BriefRepository } from "../repository";

export class InMemoryBriefRepository implements BriefRepository {
    private briefs: Brief[];

    constructor() {
        this.briefs = [];
    }

    async save(data: Brief): Promise<Brief> {
        this.briefs.push(data);

        return data;
    }

    async find(id: string): Promise<Brief | null> {
        const brief = this.briefs.find(brief => brief.id === id);
        
        return brief || null;
    }

    async update(id: string, data: Partial<Brief>): Promise<Brief> {
        const index = this.briefs.findIndex(brief => brief.id === id);

        if(index < 0) throw new Error('Brief not found');

        this.briefs[index].attributes = {
            ...this.briefs[index].attributes,
            ...data
        };

        return this.briefs[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.briefs.findIndex(brief => brief.id === id);

        if(index < 0) throw new Error('Brief not found');

        this.briefs.splice(index, 1);

        return true;
    }

    async list(): Promise<Brief[]> {
        return this.briefs;
    }
}