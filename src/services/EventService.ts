/* eslint-disable */
import { cosmosInstance } from "./CosmosInstance";
import { ContainerName } from "./cosmosService";
import { CosmosClient } from "@azure/cosmos";

class EventService {
  private client: CosmosClient;
  private database: any;

  constructor() {
    this.client = cosmosInstance.getClient();
    this.database = cosmosInstance.getDatabase();
  }

  async getEventByEventID(eventID: string) {
    try {
      const query = `SELECT * FROM Events e WHERE e.eventID = @eventID`;
      const params = [{ name: "@eventID", value: eventID }];

      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Events)
        .items.query({ query, parameters: params })
        .fetchAll();
      return resources;
    } catch (error) {
      console.error(`Error in getEvent: ${error}`);
      throw error;
    }
  }

  async getEventsByUserID(userID: string) {
    const query = `SELECT * FROM Events e WHERE @userID IN e.userIDs`;
    const params = [{ name: "@userID", value: userID }];

    const { resources } = await this.client
      .database(this.database.id)
      .container(ContainerName.Events)
      .items.query({ query, parameters: params })
      .fetchAll();
    return resources;
  }

  async createEvent(
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    suggestedBy: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ) {
    try {
      const event = {
        title,
        date,
        startTime,
        endTime,
        suggestedBy,
        userIDs,
        groupIDs,
        description,
      };
      const { resource } = await this.client
        .database(this.database.id)
        .container(ContainerName.Events)
        .items.create(event);
      return resource;
    } catch (error) {
      console.error(`Error in createEvent: ${error}`);
      throw error;
    }
  }

  async updateEvent(
    eventID: string,
    suggestedBy: string,
    title?: string,
    date?: string,
    startTime?: string,
    endTime?: string,
    userIDs?: string[],
    groupIDs?: string[],
    description?: string
  ) {
    try {
      // Fetch the existing Event
      const existingEvents = await this.getEventByEventID(eventID);

      if (existingEvents.length === 0) {
        throw new Error(`Event with ID ${eventID} not found`);
      }

      // Get the existing user document
      const existingEvent = existingEvents[0];

      // Update the fields if new values are provided
      if (title) existingEvent.title = title;
      if (date) existingEvent.date = date;
      if (startTime) existingEvent.startTime = startTime;
      if (endTime) existingEvent.endTime = endTime;
      if (userIDs) existingEvent.userIDs = userIDs;
      if (groupIDs) existingEvent.groupIDs = groupIDs;
      if (description) existingEvent.description = description;

      // Perform the update
      const { resource: updatedEvent } = await this.client
        .database(this.database.id)
        .container(ContainerName.Events)
        .item(existingEvent.id, existingEvent.eventID)
        .replace(existingEvent);

      return updatedEvent;
    } catch (error) {
      console.error(`Error in updateEvent: ${error}`);
      throw error;
    }
  }

  async deleteEvent(eventID: string) {
    try {
      const query = `SELECT * FROM Events e WHERE e.eventID = @eventID`;
      const params = [{ name: "@eventID", value: eventID }];
      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Events)
        .items.query({ query, parameters: params })
        .fetchAll();

      if (resources.length > 0) {
        const event = resources[0];
        const partitionKey = event.eventID;
        await this.client
          .database(this.database.id)
          .container(ContainerName.Events)
          .item(event.id, partitionKey)
          .delete();
        return { message: `Event with ID ${eventID} deleted successfully` };
      } else {
        return { message: `Event with ID ${eventID} not found` };
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export default EventService;
