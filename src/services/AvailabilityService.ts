/* eslint-disable */
import { cosmosInstance } from "./CosmosInstance";
import { ContainerName } from "./cosmosService";
import { BulkOperationType, CosmosClient } from "@azure/cosmos";

class AvailabilityService {
  private client: CosmosClient;
  private database: any;

  constructor() {
    this.client = cosmosInstance.getClient();
    this.database = cosmosInstance.getDatabase();
  }

  async getAvailabilityByUser(
    userID: string,
    startDate: string,
    endDate: string
  ) {
    try {
      const query = `SELECT * FROM Availability a WHERE a.userID = @userID AND a.date >= @startDate AND a.date <= @endDate`;
      const params = [
        { name: "@userID", value: userID },
        { name: "@startDate", value: startDate },
        { name: "@endDate", value: endDate },
      ];

      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Availability)
        .items.query({ query, parameters: params })
        .fetchAll();
      return resources;
    } catch (error) {
      console.error(`Error in getAvailabilityByUser: ${error}`);
      throw error;
    }
  }

  async getAvailabilityByGroup(groupID: string, date: string) {
    try {
      const query1 = `SELECT g.userIDs FROM Groups g WHERE g.groupID = @groupID`;
      const params1 = [{ name: "@groupID", value: groupID }];

      const { resources: groupResources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Groups)
        .items.query({ query: query1, parameters: params1 })
        .fetchAll();

      const userIDs = groupResources[0].userIDs;

      const query2 = `SELECT * FROM Availability a WHERE a.userID IN (${userIDs.map((id: any) => `'${id}'`).join(",")}) AND a.date = @date`;
      const params2 = [{ name: "@date", value: date }];

      const { resources: availabilityResources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Availability)
        .items.query({ query: query2, parameters: params2 })
        .fetchAll();
      return availabilityResources;
    } catch (error) {
      console.error(`Error in getAvailabilityByGroup: ${error}`);
      throw error;
    }
  }

  async updateAvailabilityByUser(
    availabilityData: {
      id: string;
      userID: string;
      date: string;
      hours: number[];
    }[]
  ): Promise<void> {
    try {
      const bulkOperations = availabilityData.map((entry) => ({
        operationType: BulkOperationType.Upsert,
        id: entry.id,
        resourceBody: {
          id: entry.id,
          userID: entry.userID,
          date: entry.date,
          hours: entry.hours,
        },
      }));

      await this.client
        .database(this.database.id)
        .container(ContainerName.Availability)
        .items.bulk(bulkOperations);
    } catch (error) {
      console.error(`Error in updateAvailabilityByUser: ${error}`);
      throw error;
    }
  }

  async addAvailabilityByUser(
    availabilityData: { userID: string; date: string; hours: number[] }[]
  ): Promise<void> {
    try {
      // Create an array of OperationInput objects
      const bulkOperations = availabilityData.map((entry) => ({
        operationType: BulkOperationType.Upsert,
        resourceBody: {
          userID: entry.userID,
          date: entry.date,
          hours: entry.hours,
        },
      }));

      // Perform a single bulk create operation on the database
      await this.client
        .database(this.database.id)
        .container(ContainerName.Availability)
        .items.bulk(bulkOperations);
    } catch (error) {
      console.error(`Error in addAvailabilityByUser: ${error}`);
      throw error;
    }
  }

  async removeAvailabilityByUser(
    availabilityData: { userID: string; date: string; hours: number[] }[]
  ): Promise<void> {
    try {
      // Loop through each item in the availabilityData array
      for (const item of availabilityData) {
        // Check if an existing entry exists in the database
        const existingItem = await this.client
          .database(this.database.id)
          .container(ContainerName.Availability)
          .item(item.userID, item.date)
          .read();

        if (existingItem.resource) {
          // If an existing entry exists, delete it
          await this.client
            .database(this.database.id)
            .container(ContainerName.Availability)
            .item(item.userID, item.date)
            .delete();
        }
      }
    } catch (error) {
      console.error(`Error in removeAvailabilityBy:User  ${error}`);
      throw error;
    }
  }

  async updateAvailabilityByGroup(
    availabilityData: {
      id: string;
      userID: string;
      date: string;
      hours: number[];
    }[]
  ): Promise<void> {
    try {
      const container = this.client
        .database(this.database.id)
        .container(ContainerName.Availability);

      await container.items.bulk(
        availabilityData.map((item) => ({
          operationType: "Upsert",
          resourceBody: item,
        }))
      );

      console.log(
        `Successfully updated availability for ${availabilityData.length} entries.`
      );
    } catch (error) {
      console.error(`Error in updateAvailabilityByGroup: ${error}`);
      throw error;
    }
  }
}

export default AvailabilityService;
