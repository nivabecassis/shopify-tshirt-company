import { Router } from "express";
var router: Router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

export default router;
