/* eslint-disable */
import { cosmosInstance } from "./CosmosInstance";
import { ContainerName } from "./cosmosService";
import { CosmosClient } from "@azure/cosmos";

class UserService {
  private client: CosmosClient;
  private database: any;

  constructor() {
    this.client = cosmosInstance.getClient();
    this.database = cosmosInstance.getDatabase();
  }

  async getUserById(userID: string) {
    try {
      const query = `SELECT * FROM Users u WHERE u.userID = @userID`;
      const params = [{ name: "@userID", value: userID }];

      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Users)
        .items.query({ query, parameters: params })
        .fetchAll();
      return resources;
    } catch (error) {
      console.error(`Error in getUserById: ${error}`);
      throw error;
    }
  }

  async getUsersByGroupID(groupID: string) {
    const query = `SELECT g.userIDs FROM Groups g WHERE g.groupID = @groupID`;
    const params = [{ name: "@groupID", value: groupID }];

    const { resources } = await this.client
      .database(this.database.id)
      .container(ContainerName.Groups)
      .items.query({ query, parameters: params })
      .fetchAll();
    return resources;
  }

  async createUser(name: string) {
    try {
      const user = { name, userID: "user-" + Date.now().toString() }; // Add a userID
      const { resource } = await this.client
        .database(this.database.id)
        .container(ContainerName.Users)
        .items.create(user);
      return resource;
    } catch (error) {
      console.error(`Error in createUser: ${error}`);
      throw error;
    }
  }

  async updateUser(
    userID: string,
    userName?: string,
    profileImageUrl?: string,
    email?: string
  ) {
    try {
      // Fetch the existing user
      const existingUsers = await this.getUserById(userID);

      if (existingUsers.length === 0) {
        throw new Error(`User with ID ${userID} not found`);
      }

      // Get the existing user document
      const existingUser = existingUsers[0];

      // Update the fields if new values are provided
      if (userName) existingUser.userName = userName;
      if (profileImageUrl) existingUser.profileImageUrl = profileImageUrl;
      if (email) existingUser.email = email;

      // Perform the update
      const { resource: updatedUser } = await this.client
        .database(this.database.id)
        .container(ContainerName.Users)
        .item(existingUser.id, existingUser.userID)
        .replace(existingUser);

      return updatedUser;
    } catch (error) {
      console.error(`Error in updateUser: ${error}`);
      throw error;
    }
  }

  async deleteUser(userID: string) {
    try {
      const query = `SELECT * FROM Users u WHERE u.userID = @userID`;
      const params = [{ name: "@userID", value: userID }];
      const { resources } = await this.client
        .database(this.database.id)
        .container(ContainerName.Users)
        .items.query({ query, parameters: params })
        .fetchAll();

      if (resources.length > 0) {
        const user = resources[0];
        const partitionKey = user.userID; // assuming userID is the partition key
        await this.client
          .database(this.database.id)
          .container(ContainerName.Users)
          .item(user.id, partitionKey)
          .delete();
        return { message: `User with ID ${userID} deleted successfully` };
      } else {
        return { message: `User with ID ${userID} not found` };
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export default UserService;
