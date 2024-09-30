/* eslint-disable */
import express, { Request, Response } from "express";
import CosmosService from "./services/cosmosService";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
const endpoint = process.env.COSMOSDB_ENDPOINT!;
const key = process.env.COSMOSDB_KEY!;
const databaseId = "my-database";
const cosmosService = new CosmosService(endpoint, key, databaseId);

app.get("/items", async (req: Request, res: Response) => {
  try {
    const containerId = "Users";
    const items = await cosmosService.queryItems(
      containerId,
      "SELECT * FROM c"
    );
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving items" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
