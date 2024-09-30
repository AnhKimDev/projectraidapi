import { EventAttributes } from "../../models/EventAttributes";

export interface getEventsByEventID {
  eventID: number;
}

export interface getEventsByUserID {
  userID: number;
}

export interface createEvent {
  event: EventAttributes;
}

export interface updateEvent {
  eventID: number;
  event: EventAttributes;
}

export interface deleteEvent {
  eventID: number;
}
