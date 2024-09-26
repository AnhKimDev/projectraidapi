import { Router } from "express";

const AvailabilityRouter = Router();

AvailabilityRouter.get("/", (req, res) => {
  res.status(200).send("Hello Availability!");
});

export default AvailabilityRouter;
