/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CosmosClient } from "@azure/cosmos";
import * as dotenv from "dotenv";
import { groups, users, availability, events } from "./mockdata.js";
dotenv.config({ path: "./.env" });

const endpoint = process.env.COSMOSDB_ENDPOINT;
const key = process.env.COSMOSDB_KEY;

// Create a new CosmosClient instance
const client = new CosmosClient({ endpoint, key });

// Create a new database
const databaseDefinition = {
  id: "my-database",
};

client.databases
  .createIfNotExists(databaseDefinition)
  .then((databaseResponse) => {
    console.log(`Database created: ${databaseResponse.database.id}`);

    // Create containers
    const containers = [
      {
        id: "Availability",
        partitionKey: {
          paths: ["/userID"],
        },
      },
      {
        id: "Groups",
        partitionKey: {
          paths: ["/groupID"],
        },
      },
      {
        id: "Users",
        partitionKey: {
          paths: ["/userID"],
        },
      },
      {
        id: "Events",
        partitionKey: {
          paths: ["/eventID"],
        },
      },
    ];

    containers.forEach((containerDefinition) => {
      client
        .database("my-database")
        .containers.createIfNotExists(containerDefinition)
        .then((containerResponse) => {
          console.log(`Container created: ${containerResponse.container.id}`);

          // Create items in the container using mockData
          let data;
          switch (containerDefinition.id) {
            case "Availability":
              data = availability;
              break;
            case "Groups":
              data = groups;
              break;
            case "Users":
              data = users;
              break;
            case "Events":
              data = events;
              break;
            default:
              throw new Error(`Unknown container: ${containerDefinition.id}`);
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          data.forEach((item) => {
            client
              .database("my-database")
              .container(containerDefinition.id)
              .items.upsert(item)
              .then((response) => {
                console.log(`Item created: ${response.item.id}`);
              })
              .catch((error) => {
                console.error(`Error creating item: ${error}`);
              });
          });
        })
        .catch((error) => {
          console.error(`Error creating container: ${error}`);
        });
    });
  })
  .catch((error) => {
    console.error(`Error creating database: ${error}`);
  });
