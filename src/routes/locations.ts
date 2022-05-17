import { Router } from "express";
import { getLocations } from "../controllers/locations";
const router: Router = Router();

router.get("/", getLocations);

export default router;
