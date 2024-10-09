/* eslint-disable */
import { cosmosInstance } from "./CosmosInstance";
import { ContainerName } from "./cosmosService";
import { CosmosClient } from "@azure/cosmos";

class GroupService {
  private client: CosmosClient;
  private database: any;

  constructor() {
    this.client = cosmosInstance.getClient();
    this.database = cosmosInstance.getDatabase();
  }

  async getGroupById(groupID: string) {
    try {
      const query = `SELECT * FROM Groups g WHERE g.groupID = @groupID`;
      const params = [{ name: "@groupID", value: groupID }];

      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Groups)
        .items.query({ query, parameters: params })
        .fetchAll();
      return resources;
    } catch (error) {
      console.error(`Error in getGroupById: ${error}`);
      throw error;
    }
  }

  async getGroupsByUserID(userID: string) {
    const query = `SELECT * FROM Groups g WHERE ARRAY_CONTAINS(g.userIDs, @userID)`;
    const params = [{ name: "@userID", value: userID }];

    const { resources } = await this.client
      .database(this.database.id)
      .container(ContainerName.Groups)
      .items.query({ query, parameters: params })
      .fetchAll();
    return resources;
  }

  async getUsersByGroupIDs(groupIDs: string[]) {
    const userIDs: string[] = [];

    for (const groupID of groupIDs) {
      const query = `SELECT g.userIDs FROM Groups g WHERE g.groupID = @groupID`;
      const params = [{ name: "@groupID", value: groupID }];
      //console.log("trying getUsersByGroupIDs with query params", query, params);

      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Groups)
        .items.query({ query, parameters: params })
        .fetchAll();
      //console.log("response:", resources);

      if (resources.length > 0) {
        const groupUserIDs = resources[0].userIDs;
        userIDs.push(...groupUserIDs);
      }
    }

    return userIDs;
  }

  async createGroup(name: string) {
    try {
      const group = { name, groupID: "group-" + Date.now().toString() };
      const { resource } = await this.client
        .database(this.database.id)
        .container(ContainerName.Groups)
        .items.create(group);
      return resource;
    } catch (error) {
      console.error(`Error in createUser: ${error}`);
      throw error;
    }
  }

  async updateGroup(groupID: string, name?: string, userIDs?: string[]) {
    try {
      // Fetch the existing user
      const existingGroups = await this.getGroupById(groupID);

      if (existingGroups.length === 0) {
        throw new Error(`User with ID ${groupID} not found`);
      }

      // Get the existing user document
      const existingGroup = existingGroups[0];

      // Update the fields if new values are provided
      if (groupID) existingGroup.groupID = groupID;
      if (name) existingGroup.name = name;
      if (userIDs) existingGroup.userIDs = userIDs;

      // Perform the update
      const { resource: updatedUser } = await this.client
        .database(this.database.id)
        .container(ContainerName.Groups)
        .item(existingGroup.id, existingGroup.groupID)
        .replace(existingGroup);

      return updatedUser;
    } catch (error) {
      console.error(`Error in updateUser: ${error}`);
      throw error;
    }
  }

  async deleteGroup(groupID: string) {
    try {
      const query = `SELECT * FROM Groups g WHERE g.groupID = @groupID`;
      const params = [{ name: "@groupID", value: groupID }];
      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Groups)
        .items.query({ query, parameters: params })
        .fetchAll();

      if (resources.length > 0) {
        const group = resources[0];
        const partitionKey = group.groupID; // assuming userID is the partition key
        await this.client
          .database(this.database.id)
          .container(ContainerName.Groups)
          .item(group.id, partitionKey)
          .delete();
        return { message: `Group with ID ${groupID} deleted successfully` };
      } else {
        return { message: `Group with ID ${groupID} not found` };
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export default GroupService;
