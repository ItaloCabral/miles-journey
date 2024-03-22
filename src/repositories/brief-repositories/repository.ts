import { Brief } from "src/entities/brief";

export interface BriefRepository {
    save(data: Brief): Promise<Brief | null>;
    find(id: string): Promise<Brief | null>;
    update(id: string, data: Partial<Brief>): Promise<Brief | null>;
    delete(id: string): Promise<boolean>;
    list(): Promise<Partial<Brief>[]>;
}
