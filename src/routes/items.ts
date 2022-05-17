import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/items";
const router: Router = Router();

router.post("/", createItem);
router.get("/", getItems);
router.post("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
