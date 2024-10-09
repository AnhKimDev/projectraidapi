import { Router } from "express";
import { Request, Response } from "express";
import GroupService from "../../services/GroupService";

const GroupRouter = Router();

const groupService = new GroupService();

GroupRouter.get("/", (req, res) => {
  res.status(200).send("Hello Group!");
});

GroupRouter.post("/getGroupById", async (req: Request, res: Response) => {
  try {
    const { groupID } = req.body as { groupID: string };
    const user = await groupService.getGroupById(groupID);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getGroupById" });
  }
});

GroupRouter.post("/getGroupsByUserID", async (req: Request, res: Response) => {
  try {
    const { userID } = req.body as { userID: string };
    const users = await groupService.getGroupsByUserID(userID);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getGroupsByUserID" });
  }
});

GroupRouter.post("/getUsersByGroupIDs", async (req: Request, res: Response) => {
  try {
    const { groupIDs } = req.body as { groupIDs: string[] };
    console.log("req: getUsersByGroupIDs", groupIDs);
    const users = await groupService.getUsersByGroupIDs(groupIDs);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getGroupsByUserID" });
  }
});

GroupRouter.post("/createGroup", async (req: Request, res: Response) => {
  try {
    const { name } = req.body as { name: string };
    const user = await groupService.createGroup(name);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error createGroup" });
  }
});

GroupRouter.post("/updateGroup", async (req: Request, res: Response) => {
  try {
    const { groupID, name, userIDs } = req.body as {
      groupID: string;
      name?: string;
      userIDs?: string[];
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await groupService.updateGroup(groupID, name, userIDs);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updateGroup" });
  }
});

GroupRouter.delete("/deleteGroup", async (req: Request, res: Response) => {
  try {
    const { groupID } = req.body as { groupID: string };
    const user = await groupService.deleteGroup(groupID);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

export default GroupRouter;
