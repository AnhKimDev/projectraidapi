import { Router } from "express";
import { Request, Response } from "express";
import AvailabilityService from "../../services/AvailabilityService";

const AvailabilityRouter = Router();

const availabilityService = new AvailabilityService();

AvailabilityRouter.get("/", (req, res) => {
  res.status(200).send("Hello Availability!");
});

AvailabilityRouter.post(
  "/getAvailabilityByUser",
  async (req: Request, res: Response) => {
    try {
      const { userID, startDate, endDate } = req.body as {
        userID: string;
        startDate: string;
        endDate: string;
      };
      console.log(
        "req: getAvailabilityByUser with",
        userID,
        startDate,
        endDate
      );
      const user = await availabilityService.getAvailabilityByUser(
        userID,
        startDate,
        endDate
      );
      //console.log("res: getAvailabilityByUser with", user);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving getAvailabilityByUser" });
    }
  }
);

AvailabilityRouter.post(
  "/getAvailabilityByGroup",
  async (req: Request, res: Response) => {
    try {
      const { groupID, date } = req.body as { groupID: string; date: string };
      console.log("req: getAvailabilityByGroup ", groupID, date);
      const user = await availabilityService.getAvailabilityByGroup(
        groupID,
        date
      );
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving getAvailabilityByGroup" });
    }
  }
);

AvailabilityRouter.post(
  "/updateAvailabilityByUser",
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
      console.log("req: updateAvailabilityByUser with", availabilityData);
      const user =
        await availabilityService.updateAvailabilityByUser(availabilityData);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving updateAvailabilityByUser" });
    }
  }
);

AvailabilityRouter.post(
  "/addAvailabilityByUser",
  async (req: Request, res: Response) => {
    try {
      const { availabilityData } = req.body as {
        availabilityData: {
          userID: string;
          date: string;
          hours: number[];
        }[];
      };
      console.log("req: addAvailabilityByUser with", availabilityData);
      res
        .status(200)
        .json(
          await availabilityService.addAvailabilityByUser(availabilityData)
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving updateAvailabilityByUser" });
    }
  }
);

AvailabilityRouter.post(
  "/removeAvailabilityByUser",
  async (req: Request, res: Response) => {
    try {
      const { availabilityData } = req.body as {
        availabilityData: { userID: string; date: string; hours: number[] }[];
      };
      console.log("req: removeAvailabilityByUser with", availabilityData);
      res
        .status(200)
        .json(
          await availabilityService.removeAvailabilityByUser(availabilityData)
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving updateAvailabilityByUser" });
    }
  }
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
  }
);

export default AvailabilityRouter;
