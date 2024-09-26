import { Router } from "express";

const GroupRouter = Router();

GroupRouter.get("/", (req, res) => {
  res.status(200).send("Hello Group!");
});

export default GroupRouter;
