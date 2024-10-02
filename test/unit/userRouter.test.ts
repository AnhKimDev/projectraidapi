import request from "supertest";
import server from "../../src/server";

describe("GET /", () => {
  it("should return a 200 status code and 'Hello User!' response", async () => {
    const response = await request(server).get("/v1/user");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello User!");
  });
});

describe("GET /getUserById", () => {
  it("should return a 200 status code and a user object", async () => {
    const userID = "user-1";
    const response = await request(server)
      .get("/v1/user/getUserById")
      .send({ userID });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ userID: userID }));
  });

  it("should return a 500 status code and an error message if user not found", async () => {
    const userID = "some-invalid-user-id";
    const response = await request(server)
      .get("/v1/user/getUserById")
      .send({ userID });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error getUserById" });
  });
});

describe("GET /getUsersByGroupID", () => {
  it("should return a 200 status code and an array of user objects", async () => {
    const groupID = "group-1";
    const response = await request(server)
      .get("/v1/user/getUsersByGroupID")
      .send({ groupID });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String) }),
      ])
    );
  });

  it("should return a 500 status code and an error message if an error occurs", async () => {
    const groupID = "some-invalid-group-id";
    const response = await request(server)
      .get("/v1/user/getUsersByGroupID")
      .send({ groupID });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error getUsersByGroupID" });
  });
});

describe("POST /createUser ", () => {
  it("should return a 200 status code and a newly created user object", async () => {
    const name = "John Doe";
    const response = await request(server)
      .post("/v1/user/createUser ")
      .send({ name });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ name }));
  });

  it("should return a 500 status code and an error message if an error occurs", async () => {
    const name = 1;
    const response = await request(server)
      .post("/v1/user/createUser ")
      .send({ name });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error createUser" });
  });
});

describe("POST /updateUser ", () => {
  it("should return a 200 status code and an updated user object", async () => {
    const userID = "user-2";
    const userName = "Jane Doe";
    const profileImageUrl = "https://example.com/profile.jpg";
    const email = "jane.doe@example.com";
    const response = await request(server)
      .post("/v1/user/updateUser ")
      .send({ userID, userName, profileImageUrl, email });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ id: userID, name: userName })
    );
  });

  it("should return a 500 status code and an error message if an error occurs", async () => {
    const userID = "some-invalid-user-id";
    const response = await request(server).post("/v1/user/updateUser ").send({
      userID,
      userName: "Jane Doe",
      profileImageUrl: "https://example.com/profile.jpg",
      email: "jane.doe@example.com",
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error retrieving users" });
  });
});

describe("DELETE /v1/user/deleteUser ", () => {
  it("should return a 200 status code and a deleted user object", async () => {
    const userID = "user-16";
    const response = await request(server)
      .delete("/v1/user/deleteUser ")
      .send({ userID });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ id: userID }));
  });

  it("should return a 500 status code and an error message if an error occurs", async () => {
    const userID = "some-invalid-user-id";
    const response = await request(server)
      .delete("/v1/user/deleteUser ")
      .send({ userID });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error retrieving users" });
  });
});
