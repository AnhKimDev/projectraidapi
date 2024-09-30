/* eslint-disable */
import {
  CosmosClient,
  Container,
  Database,
  SqlQuerySpec,
  PartitionKey,
  Item,
  BulkOperationType,
  JSONObject,
  OperationInput,
} from "@azure/cosmos";

class CosmosService {
  private client: CosmosClient;
  private databaseId: string;

  constructor(client: CosmosClient, databaseId: string) {
    this.client = client;
    this.databaseId = databaseId;
  }

  private getContainer(containerId: string): Container {
    const database: Database = this.client.database(this.databaseId);
    return database.container(containerId);
  }

  async createItem<T extends Item>(containerId: string, item: T): Promise<T> {
    const container = this.getContainer(containerId);
    const { resource } = await container.items.create(item);
    return resource as T;
  }

  async readItem<T extends Item>(
    containerId: string,
    itemId: string,
    partitionKey?: PartitionKey
  ): Promise<T | undefined> {
    const container = this.getContainer(containerId);
    try {
      const { resource } = await container.item(itemId, partitionKey).read();
      return resource as T;
    } catch (error: any) {
      if (error.code === 404) {
        return undefined;
      }
      throw error;
    }
  }

  async updateItem<T>(
    containerId: string,
    itemId: string,
    item: Partial<T>,
    partitionKey?: PartitionKey
  ): Promise<T> {
    const container = this.getContainer(containerId);
    const { resource } = await container
      .item(itemId, partitionKey)
      .replace(item);
    return resource as T;
  }

  async upsertItem<T>(containerId: string, item: T): Promise<T> {
    const container = this.getContainer(containerId);
    const { resource } = await container.items.upsert(item);
    return resource as T;
  }

  async deleteItem(
    containerId: string,
    itemId: string,
    partitionKey?: PartitionKey
  ): Promise<void> {
    const container = this.getContainer(containerId);
    await container.item(itemId, partitionKey).delete();
  }

  async queryItems<T extends Item>(
    containerId: string,
    query: SqlQuerySpec
  ): Promise<T[]> {
    const container = this.getContainer(containerId);
    const { resources } = await container.items.query<T>(query).fetchAll();
    return resources;
  }

  async bulkCreate<T extends JSONObject>(
    containerId: string,
    items: T[]
  ): Promise<T[]> {
    const container = this.getContainer(containerId);
    const operations: OperationInput[] = items.map((item) => ({
      operationType: BulkOperationType.Create,
      resourceBody: item,
    }));
    const response = await container.items.bulk(operations);
    return response
      .filter((result) => result.statusCode >= 200 && result.statusCode < 300)
      .map((result) => result.resourceBody as T);
  }

  async bulkUpsert<T extends JSONObject>(
    containerId: string,
    items: T[]
  ): Promise<T[]> {
    const container = this.getContainer(containerId);
    const operations: OperationInput[] = items.map((item) => ({
      operationType: BulkOperationType.Upsert,
      resourceBody: item,
    }));
    const response = await container.items.bulk(operations);
    return response
      .filter((result) => result.statusCode >= 200 && result.statusCode < 300)
      .map((result) => result.resourceBody as T);
  }
}

export default CosmosService;
