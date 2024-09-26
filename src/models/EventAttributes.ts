export interface EventAttributes {
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
