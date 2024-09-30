import { AvailabilityAttributes } from "../../models/AvailabilityAttributes";

export interface getAvailabilityByUser {
  userID: string;
  startDate: Date;
  endDate: Date;
}

export interface getAvailabilityByGroup {
  groupID: number;
  date: Date;
}

export interface updateAvailabilityByUser {
  userID: string;
  startDate: Date;
  endDate: Date;
  hours: number[];
}

export interface updateAvailabilityByGroup {
  dateIso: string;
  startDate: Date;
  endDate: Date;
  usersAvailability: number[];
}

export interface addAvailabilityItem {
  userID: string;
  dateIso: string;
  hours: number[];
}

export interface removeAvailabilityItem {
  userID: string;
  dateIso: string;
}

export interface updateExistingAvailabilityItem {
  existingItem: AvailabilityAttributes;
  hours: number[];
}
