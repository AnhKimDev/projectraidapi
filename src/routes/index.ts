import { Router } from "express";

const AppRouter = Router();

AppRouter.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

export default AppRouter;
