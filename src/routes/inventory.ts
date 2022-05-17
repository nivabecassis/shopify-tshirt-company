import { Router } from "express";
import { transferInventory } from "../controllers/inventory";
const router: Router = Router();

router.post("/transfer", transferInventory);

export default router;
