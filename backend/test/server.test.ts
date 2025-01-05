import { Entry } from "@prisma/client";
import Prisma from "../src/db";
import { server } from "../src/server";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

beforeAll(async () => {
  await Prisma.entry.deleteMany({});
});

afterEach(async () => {
  await Prisma.entry.deleteMany({});
});

afterAll(() => {
  server.close();
});

describe("GET /get/", () => {
  it("should return status 200", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual([]);
  });
});

describe("GET test entries", () => {
  test("should return all entries", async () => {
    const mockEntries: { [key: number]: Entry } = {};
    for (var i = 0; i < 10; i++) {
      mockEntries[i] = {
        id: `${i}`,
        title: `Test Entry #${i}`,
        description: "This is a test",
        created_at: new Date(Date.now() + i),
        scheduled_for: new Date(Date.now() + 3000 + i),
      };
    }

    console.log(Object.values(mockEntries));

    jest.spyOn(Prisma.entry, "findMany").mockResolvedValue(Object.values(mockEntries));

    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(Object.values(mockEntries)));
  });
});

describe("GET /get/:id", () => {
  test("should return entry with id", async () => {
    const mockEntry: Entry = {
      id: "1",
      title: "Test Entry",
      description: "This is a test",
      created_at: new Date(),
      scheduled_for: new Date(),
    };

    jest.spyOn(Prisma.entry, "findUnique").mockResolvedValue(mockEntry);

    const response = await server.inject({
      method: "GET",
      url: "/get/1",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json().id).toEqual(mockEntry.id);
  });

  test("should return 500 if entry is not found", async () => {
    jest.spyOn(Prisma.entry, "findUnique").mockResolvedValue(null);

    const response = await server.inject({
      method: "GET",
      url: "/get/falseid",
    });
    expect(response.statusCode).toEqual(500);
    expect(response.json()).toEqual({ msg: "Error finding entry with id falseid" });
  });
});

describe("POST /create/", () => {
  test("should create new entry", async () => {
    const mockEntry: Entry = {
      id: "1",
      title: "Test Entry",
      description: "This is a test",
      created_at: new Date(),
      scheduled_for: new Date(),
    };

    jest.spyOn(Prisma.entry, "create").mockResolvedValue(mockEntry);

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: mockEntry,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(mockEntry));
  });

  test("should return 500 if error creating entry", async () => {
    jest.spyOn(Prisma.entry, "create").mockRejectedValue(new Error());
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: {},
    });

    expect(response.statusCode).toEqual(500);
    expect(response.json()).toEqual({ msg: "Error creating entry" });
  });
});

// test the delete route
describe("DELETE /delete/:id", () => {
  test("should delete entry with id", async () => {
    const mockEntry: Entry = {
      id: "1",
      title: "Test Entry",
      description: "This is a test",
      created_at: new Date(),
      scheduled_for: new Date(),
    };

    jest.spyOn(Prisma.entry, "delete").mockResolvedValue(mockEntry);

    const response = await server.inject({
      method: "DELETE",
      url: "/delete/1",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual({ msg: "Deleted successfully" });
  });

  test("should return 500 if error deleting entry", async () => {
    jest.spyOn(Prisma.entry, "delete").mockRejectedValue(new Error());
    const response = await server.inject({
      method: "DELETE",
      url: "/delete/1",
    });

    expect(response.statusCode).toEqual(500);
    expect(response.json()).toEqual({ msg: "Error deleting entry" });
  });
});

// Test that a scheduled date can not be in the past

// describe("scheduled date cannot be in the past", () => {
//    test("should return 500 if scheduled date is in the past", async () => {
//        const mockEntry: Entry = {
//            id: "1",
//            title: "Test Entry",
//            description: "This is a test",
//            created_at: new Date(),
//            scheduled_for: new Date(Date.now() - 1000),
//        };

//        jest.spyOn(Prisma.entry, "create").mockResolvedValue(mockEntry);

//        const response = await server.inject({
//            method: "POST",
//            url: "/create/",
//            payload: mockEntry,
//        });

//        expect(response.statusCode).toEqual(500);
//        expect(response.json().created_at > response.json().scheduled_for).toEqual(true);
//    });
// });

// Test that a created dated can not be anything other than todays date

// Test page with invalid url is not loaded and 404 is returned

// Test all cards have at least: title, created_at, scheduled_for and content
