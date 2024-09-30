export interface EventAttributes {
  eventID: number;
  title: string;
  description?: string;
  dateYYYYMMDD: string;
  startTime: string;
  endTime: string;
  suggestedBy: string;
  userIDs?: number[];
  groupIDs?: number[];
}
