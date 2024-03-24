import { Router } from "express";
import { BriefController } from "../controllers/brief-controller";
import { InMemoryBriefRepository } from "../repositories/brief-repositories/implementations/in-memory";

const router = Router();

const BriefRepository = new InMemoryBriefRepository()

const briefController = new BriefController(BriefRepository)

router.post('/briefs/', briefController.create.bind(briefController));

router.get('/briefs/', briefController.list.bind(briefController));

router.get('/briefs/:id', briefController.retrieve.bind(briefController));

router.put('/briefs/:id', briefController.update.bind(briefController));

router.delete('/briefs/:id', briefController.delete.bind(briefController));

// router.get('/populate', briefController.populate.bind(briefController));

export {
    router as briefRoutes
}