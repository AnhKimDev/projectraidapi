/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import UserRouter from "./user";
import GroupRouter from "./group";
import AvailabilityRouter from "./availability";
import EventRouter from "./event";

const AppRouter = Router();
AppRouter.use("/user", UserRouter);
AppRouter.use("/group", GroupRouter);
AppRouter.use("/event", EventRouter);
AppRouter.use("/availability", AvailabilityRouter);

AppRouter.get("/", (req, res) => {
  res.status(200).send("Hello, App!");
});

export default AppRouter;
