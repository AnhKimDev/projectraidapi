/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { UserService } from "../../services/UserService";

const UserRouter = Router();

UserRouter.get("/", (req, res) => {
  res.status(200).send("Hello User!");
});

export default UserRouter;
