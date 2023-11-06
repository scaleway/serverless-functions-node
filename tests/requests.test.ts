import { FastifyInstance } from "fastify";
import { serveHandler } from "../framework/local/index";
import { Event, Callback, Context, Handler } from "../framework/types/types";

function handler(event: Event, context: Context, callback: Callback) {
  return {
    body: "Hello from a " + event.httpMethod + " request",
  };
}

describe('testing index file', () => {
  let server: FastifyInstance;

  // Applies only to tests in this describe block
  beforeEach(async () => {
    server = serveHandler(handler, 8080);
    await server.ready();
  });

  test('Check GET request', async () => {
    // Make request
    const response = await fetch('http://localhost:8080', {
      method: 'GET',
    });

    var responseText = await response.text();
    expect(responseText).toBe("Hello from a GET request");
  });

  test('Check POST request', async () => {
    // Make request
    let data = { "foo": "bar" };
    const response = await fetch('http://localhost:8080', {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(data),
    });

    var responseText = await response.text();
    expect(responseText).toBe("Hello from a POST request");
  });

  afterEach(async () => {
    // Stop the server
    server.close();
  });
});
