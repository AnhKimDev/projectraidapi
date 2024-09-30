/* eslint-disable */
import { CosmosClient, User } from "@azure/cosmos";

enum ContainerName {
  Users = "Users",
  Groups = "Groups",
  Events = "Events",
  Availability = "Availability",
}
class UserService {
  private cosmosClient: CosmosClient;
  private database: any;
  private container: any;

  constructor(
    endpoint: string,
    key: string,
    databaseName: string,
    containerName: string
  ) {
    this.cosmosClient = new CosmosClient({ endpoint, key });
    this.database = this.cosmosClient.database(databaseName);
    this.container = this.database.container(containerName);
    this.initDatabaseAndContainer();
  }

  private async initDatabaseAndContainer() {
    const { database } = await this.cosmosClient.databases.createIfNotExists({
      id: this.database.id,
    });
    const { container } = await database.containers.createIfNotExists({
      id: this.container.id,
    });
  }

  async getUserById(userID: string) {
    const query = `SELECT * FROM Users u WHERE u.userID = @userID`;
    const params = [{ name: "@userID", value: userID }];

    const { resources } = await this.cosmosClient
      .database(this.database.id)
      .container(ContainerName.Users)
      .items.query({ query, parameters: params })
      .fetchAll();
    return resources;
  }

  async getUsersByGroupID(groupID: number) {
    console.log("called groupid", groupID);
    const query = `SELECT g.userIDs FROM Groups g WHERE g.groupID = @groupID`;
    const params = [{ name: "@groupID", value: groupID }];

    const { resources } = await this.cosmosClient
      .database(this.database.id)
      .container(ContainerName.Groups)
      .items.query({ query, parameters: params })
      .fetchAll();
    return resources;
  }

  async createUser(name: string) {
    const user = { name };
    const { resource } = await this.cosmosClient
      .database(this.database.id)
      .container(ContainerName.Users)
      .items.create(user);
    return resource;
  }

  async updateUser(
    userID: number,
    userName?: string,
    profileImageUrl?: string,
    email?: string
  ) {
    const user: {
      id: number;
      userName?: string;
      profileImageUrl?: string;
      email?: string;
    } = { id: userID };
    if (userName) user.userName = userName;
    if (profileImageUrl) user.profileImageUrl = profileImageUrl;
    if (email) user.email = email;

    const { resource } = await this.cosmosClient
      .database(this.database.id)
      .container(ContainerName.Users)
      .items.upsert(user);
    return resource;
  }

  async deleteUser(userID: string) {
    try {
      const query = `SELECT * FROM Users u WHERE u.userID = @userID`;
      const params = [{ name: "@userID", value: userID }];
      const { resources } = await this.cosmosClient
        .database(this.database.id)
        .container(ContainerName.Users)
        .items.query({ query, parameters: params })
        .fetchAll();

      if (resources.length > 0) {
        const user = resources[0];
        const partitionKey = user.userID; // assuming userID is the partition key
        await this.cosmosClient
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
