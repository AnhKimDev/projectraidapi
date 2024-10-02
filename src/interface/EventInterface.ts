export interface Event {
  eventID: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  suggestedBy: string;
  userIDs?: string[];
  groupIDs?: string[];
}

export interface EventInterface {
  getEvent(eventID: string): Promise<Event>;
  getEvents(): Promise<Event[]>;
  createEvent(
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string,
  ): Promise<void>;
  updateEvent(
    eventID: string,
    suggestedBy: string,
    title?: string,
    date?: string,
    startTime?: string,
    endTime?: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string,
  ): Promise<void>;
  deleteEvent(eventID: string): Promise<void>;
}
