import { FastifyInstance } from "fastify";
import { serveHandler } from "../framework/local/index";
import { Event, Callback, Context } from "../framework/types/types";

function handler(event: Event, context: Context, callback: Callback) {
  return {
    body: "Hello from a " + event.httpMethod + " request",
  };
}

describe("Test local server can handle different request types", () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    // Start the server
    server = serveHandler(handler, 8080);
    await server.ready();
  });

  test("GET request response", async () => {
    // Make request
    const response = await fetch("http://localhost:8080", {
      method: "GET",
    });

    const responseText = await response.text();
    expect(responseText).toBe("Hello from a GET request");
  });

  test("POST request response", async () => {
    // Make request
    let data = { foo: "bar" };
    const response = await fetch("http://localhost:8080", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    expect(responseText).toBe("Hello from a POST request");
  });

  afterEach(async () => {
    // Stop the server
    server.close();
  });
});

const binaryData = Buffer.from(
  "\x80\x81\x82\x83\x84\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f",
);

function b64handler(event: Event, context: Context, callback: Callback) {
  return {
    body: binaryData.toString("base64"),
    isBase64Encoded: true,
  };
}

describe("Test local server can handle base64 encoded response", () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    // Start the server
    server = serveHandler(b64handler, 8080);
    await server.ready();
  });

  test("Base64 encoded response", async () => {
    // Make request
    const response = await fetch("http://localhost:8080");

    const responeBytes = await response.arrayBuffer();
    const responseBuffer = Buffer.from(responeBytes);
    expect(responseBuffer).toEqual(binaryData);
  });

  afterEach(async () => {
    // Stop the server
    server.close();
  });
});
