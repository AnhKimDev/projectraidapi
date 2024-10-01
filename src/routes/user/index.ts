/* eslint-disable */

import { Router } from "express";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import UserService from "./../../services/UserService";

const UserRouter = Router();

const userService = new UserService();

UserRouter.get("/", (req, res) => {
  res.status(200).send("Hello User!");
});

UserRouter.get("/getUserById", async (req: Request, res: Response) => {
  try {
    const userID = req.body.userID;
    const user = await userService.getUserById(userID);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

UserRouter.get("/getUsersByGroupID", async (req: Request, res: Response) => {
  try {
    const groupID = req.body.groupID;
    const users = await userService.getUsersByGroupID(groupID);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

UserRouter.post("/createUser", async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const user = await userService.createUser(name);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

UserRouter.post("/updateUser", async (req: Request, res: Response) => {
  try {
    const userID: string = req.body.name;
    const userName: string = req.body.userName;
    const profileImageUrl: string = req.body.profileImageUrl;
    const email: string = req.body.email;
    const user = await userService.updateUser(
      userID,
      userName,
      profileImageUrl,
      email
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

UserRouter.delete("/deleteUser", async (req: Request, res: Response) => {
  try {
    const userID: string = req.body.userID;
    const user = await userService.deleteUser(userID);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

export default UserRouter;
