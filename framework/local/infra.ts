import type { Event } from "../types/types";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";

// Inject headers for incoming requests.
export function injectIngressHeaders(request: FastifyRequest, event: Event) {
  const headers: Record<string, unknown> = event.headers as Event;

  headers["Forwarded"] = `for=${request.ip};proto=http`;
  headers["X-Forwarded-For"] = request.ip;
  headers["K-Proxy-Request"] = "activator";
  headers["X-Forwarded-Proto"] = "http";
  headers["X-Envoy-External-Address"] = request.ip;
  headers["X-Request-Id"] = randomUUID();

  event.headers = headers;
}

// Inject headers for outgoing requests.
export function injectEgressHeaders(response: FastifyReply): void {
  response.header("server", "envoy");
}
