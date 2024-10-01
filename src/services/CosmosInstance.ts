import CosmosService from "./cosmosService";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const cosmosInstance = CosmosService.getInstance(
  process.env.COSMOSDB_ENDPOINT!,
  process.env.COSMOSDB_KEY!,
  process.env.COSMOS_DB_DATABASE!
);

export { cosmosInstance };
