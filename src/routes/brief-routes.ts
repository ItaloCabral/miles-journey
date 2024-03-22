import { Router } from "express";
import { BriefController } from "../controllers/brief-controller";
import { InMemoryBriefRepository } from "../repositories/brief-repositories/implementations/in-memory";

const router = Router();

const BriefRepository = new InMemoryBriefRepository()

const briefController = new BriefController(BriefRepository)

router.post('/', briefController.create.bind(briefController));

router.get('/', briefController.list.bind(briefController));

export {
    router as briefRoutes
}