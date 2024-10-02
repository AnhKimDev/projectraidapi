import { Router } from "express";
import { Request, Response } from "express";
import EventService from "../../services/EventService";

const EventRouter = Router();
const eventService = new EventService();

EventRouter.get("/", (req, res) => {
  res.status(200).send("Hello Event!");
});

EventRouter.get("/getEventByEventID", async (req: Request, res: Response) => {
  try {
    const { eventID } = req.body as { eventID: string };
    const event = await eventService.getEventByEventID(eventID);
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getEventByEventID" });
  }
});

EventRouter.get("/getEventsByUserID", async (req: Request, res: Response) => {
  try {
    const { userID } = req.body as { userID: string };
    const events = await eventService.getEventsByUserID(userID);
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getEventsByUserID" });
  }
});

EventRouter.post("/createEvent", async (req: Request, res: Response) => {
  try {
    const {
      title,
      date,
      startTime,
      endTime,
      suggestedBy,
      userIDs,
      groupIDs,
      description,
    } = req.body as {
      title: string;
      date: string;
      startTime: string;
      endTime: string;
      suggestedBy: string;
      userIDs?: string[];
      groupIDs?: string[];
      description?: string;
    };
    const event = await eventService.createEvent(
      title,
      date,
      startTime,
      endTime,
      suggestedBy,
      userIDs,
      groupIDs,
      description,
    );
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error createEvent" });
  }
});

EventRouter.post("/updateEvent", async (req: Request, res: Response) => {
  try {
    const {
      eventID,
      title,
      date,
      startTime,
      endTime,
      suggestedBy,
      userIDs,
      groupIDs,
      description,
    } = req.body as {
      eventID: string;
      suggestedBy: string;
      title?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
      userIDs?: string[];
      groupIDs?: string[];
      description?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await eventService.updateEvent(
      eventID,
      suggestedBy,
      title,
      date,
      startTime,
      endTime,

      userIDs,
      groupIDs,
      description,
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updateEvent" });
  }
});

EventRouter.delete("/deleteEvent", async (req: Request, res: Response) => {
  try {
    const { eventID } = req.body as { eventID: string };
    const user = await eventService.deleteEvent(eventID);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleteEvent" });
  }
});

export default EventRouter;
