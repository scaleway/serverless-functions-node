import { FastifyRequest } from "fastify";
import type { RequestContext, Event } from "../types/types";
import { IncomingHttpHeaders } from "http";

function formatRequestContext(request: FastifyRequest): RequestContext {
  return {
    accountId: "",
    resourceId: "",
    stage: "",
    requestId: "",
    resourcePath: "",
    authorizer: null,
    httpMethod: request.method,
    apiId: "",
  };
}

function formatRequestHeaders(
  headers: IncomingHttpHeaders
): Record<string, unknown> {
  const formattedHeader: Record<string, unknown> = {};
  for (const key in headers) {
    formattedHeader[key] = headers[key];
  }
  return formattedHeader;
}

function formatRequestParams(request: FastifyRequest): Record<string, string> {
  const formattedParam: Record<string, string> = {};
  const jsonParam = JSON.parse(JSON.stringify(request.query));
  for (const param in jsonParam) {
    formattedParam[param] = jsonParam[param];
  }
  return formattedParam;
}

export function formatHTTPEvent(request: FastifyRequest): Event {
  let body = "";
  if (request.body) {
    body = request.body as string;
  }
  const isBase64Encoded =
    Buffer.from(body, "base64").toString("base64") === body;

  return {
    resource: "",
    path: request.urlData().path as string,
    httpMethod: request.method,
    headers: formatRequestHeaders(request.headers),
    multiValueHeaders: null,
    queryStringParameters: formatRequestParams(request),
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: {},
    requestContext: formatRequestContext(request),
    body: body,
    isBase64Encoded: isBase64Encoded,
  };
}
