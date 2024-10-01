/* eslint-disable */
import { CosmosClient } from "@azure/cosmos";

export enum ContainerName {
  Users = "Users",
  Groups = "Groups",
  Events = "Events",
  Availability = "Availability",
}

class CosmosService {
  private static instance: CosmosService;
  private cosmosClient: CosmosClient;
  private database: any;

  private constructor(endpoint: string, key: string, databaseName: string) {
    this.cosmosClient = new CosmosClient({ endpoint, key });
    this.database = this.cosmosClient.database(databaseName);
    this.initDatabase();
  }

  private async initDatabase() {
    await this.cosmosClient.databases.createIfNotExists({
      id: this.database.id,
    });
  }

  public static getInstance(
    endpoint: string,
    key: string,
    databaseName: string
  ): CosmosService {
    if (!CosmosService.instance) {
      CosmosService.instance = new CosmosService(endpoint, key, databaseName);
    }
    return CosmosService.instance;
  }

  public getClient(): CosmosClient {
    return this.cosmosClient;
  }

  public getDatabase(): any {
    return this.database;
  }
}

export default CosmosService;
