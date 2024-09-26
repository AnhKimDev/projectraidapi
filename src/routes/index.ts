/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import UserRouter from "./user";

const AppRouter = Router();
AppRouter.use("/user", UserRouter);

AppRouter.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

export default AppRouter;
