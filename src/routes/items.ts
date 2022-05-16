import { Router } from "express";
import { deleteItem, getItems } from "../controllers/items";
const router: Router = Router();

/* GET home page. */
router.get("/", getItems);
router.delete("/:id", deleteItem);

export default router;
