import { Router } from "express";
import { Request, Response } from "express";
import AvailabilityService from "../../services/AvailabilityService";

const AvailabilityRouter = Router();

const availabilityService = new AvailabilityService();

AvailabilityRouter.get("/", (req, res) => {
  res.status(200).send("Hello Availability!");
});

AvailabilityRouter.get(
  "/getAvailabilityByUser",
  async (req: Request, res: Response) => {
    try {
      const { userID, startDate, endDate } = req.body as {
        userID: string;
        startDate: string;
        endDate: string;
      };
      const user = await availabilityService.getAvailabilityByUser(
        userID,
        startDate,
        endDate,
      );
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving getAvailabilityByUser" });
    }
  },
);

AvailabilityRouter.get(
  "/getAvailabilityByGroup",
  async (req: Request, res: Response) => {
    try {
      const { groupID, date } = req.body as { groupID: string; date: string };
      const user = await availabilityService.getAvailabilityByGroup(
        groupID,
        date,
      );
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving getAvailabilityByGroup" });
    }
  },
);

AvailabilityRouter.post(
  "/updateAvailabilityByUser",
  async (req: Request, res: Response) => {
    try {
      const { availabilityData } = req.body as {
        userID: string;
        availabilityData: { userID: string; date: string; hours: number[] }[];
      };
      const user =
        await availabilityService.updateAvailabilityByUser(availabilityData);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving updateAvailabilityByUser" });
    }
  },
);

AvailabilityRouter.post(
  "/updateAvailabilityByGroup",
  async (req: Request, res: Response) => {
    try {
      const { availabilityData } = req.body as {
        availabilityData: {
          id: string;
          userID: string;
          date: string;
          hours: number[];
        }[];
      };
      const user =
        await availabilityService.updateAvailabilityByGroup(availabilityData);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving updateAvailabilityByGroup" });
    }
  },
);

export default AvailabilityRouter;
