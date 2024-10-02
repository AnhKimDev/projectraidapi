import request from "supertest";
import server from "../../src/server";

describe("App Router", () => {
  it("should return a 200 status code for the root route", async () => {
    const response = await request(server).get("/v1/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, App!");
  });

  it("should return a 404 status code for an unknown route", async () => {
    const response = await request(server).get("/unknown");
    expect(response.status).toBe(404);
  });

  it("should route to the User Router", async () => {
    const response = await request(server).get("/v1/user");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello User!");
  });

  it("should route to the Group Router", async () => {
    const response = await request(server).get("/v1/group");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Group!");
  });

  it("should route to the Event Router", async () => {
    const response = await request(server).get("/v1/event");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Event!");
  });

  it("should route to the Availability Router", async () => {
    const response = await request(server).get("/v1/availability");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Availability!");
  });
});
