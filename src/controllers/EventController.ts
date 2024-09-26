import { EventAttributes } from "../models/EventAttributes";

export interface EventController {
  getEvent: (eventID: string) => Promise<EventAttributes>;
  getEvents: () => Promise<EventAttributes[]>;
  createEvent: (
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ) => Promise<void>;
  updateEvent: (
    eventID: string,
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ) => Promise<void>;
  deleteEvent: (eventID: string) => Promise<void>;
}
