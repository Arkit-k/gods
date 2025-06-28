import { Request, Response } from "express";
import deathService from "../services/death";

export class DeathController {
    async getDeath(req: Request, res: Response) {
        try {
            const { name, age } = req.query as { name: string; age: string };
            const story = await deathService.generateDeathStory(name, age);
            res.json({ name, age, story });
        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                error: error instanceof Error ? error.message : "Generation failed" 
            });
        }
    }
}

export default new DeathController();

