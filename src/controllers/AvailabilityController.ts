import { AvailabilityAttributes } from "../models/AvailabilityAttributes";

export interface AvailabilityController {
  getAvailabilityByUser: (
    userID: string,
    startDate: Date,
    endDate: Date
  ) => Promise<AvailabilityAttributes[]>;
  getAvailabilityByGroup: (
    groupID: number,
    date: Date
  ) => Promise<AvailabilityAttributes[]>;
  updateAvailabilityByUser: (
    userID: string,
    startDate: Date,
    endDate: Date,
    hours: number[]
  ) => Promise<void>;
  updateAvailabilityByGroup: (
    dateIso: string,
    startDate: Date,
    endDate: Date,
    usersAvailability: number[]
  ) => Promise<void>;
}
