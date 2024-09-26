import { Router } from "express";

const EventRouter = Router();

EventRouter.get("/", (req, res) => {
  res.status(200).send("Hello Event!");
});

export default EventRouter;
