import { Router } from "express";
import { createItem, deleteItem, getItems } from "../controllers/items";
const router: Router = Router();

/* GET home page. */
router.post("/", createItem);
router.get("/", getItems);
router.delete("/:id", deleteItem);

export default router;
