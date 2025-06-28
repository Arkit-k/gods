import { Request, Response } from "express";
import LoverService from "../services/lover";



class LoverController {
    async getLover(req: Request, res: Response) {
        try {
            const { name, gender } = req.query as { name: string; gender: string };
            const story = await LoverService.getLover(name, gender);
            res.json({ name, gender, story });
        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                error: error instanceof Error ? error.message : "Generation failed" 
            });
        }
    }
}

export default new LoverController();

