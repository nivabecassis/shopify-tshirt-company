import { Router } from "express";
import { getLocations } from "../controllers/locations";
const router: Router = Router();

/* GET users listing. */
router.get("/", getLocations);

export default router;
