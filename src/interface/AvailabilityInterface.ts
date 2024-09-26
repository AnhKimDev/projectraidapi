export interface Availability {
  date: string;
  userID: string;
  hours: number[];
}

export interface AvailabilityInterface {
  getAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date
  ): Promise<Availability[]>;
  getAvailabilityByGroup(groupID: number, date: Date): Promise<Availability[]>;
  updateAvailabilityByUser(
    userID: string,
    startDate: Date,
    endDate: Date,
    hours: number[]
  ): Promise<void>;
  updateAvailabilityByGroup(
    dateIso: string,
    startDate: Date,
    endDate: Date,
    usersAvailability: number[]
  ): Promise<void>;
}
