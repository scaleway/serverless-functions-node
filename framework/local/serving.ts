import { FastifyReply, FastifyRequest } from "fastify";
import { Callback, Context, Event, Handler } from "../types/types";
import { formatContext } from "./context";
import { formatHTTPEvent } from "./event";
import { injectEgressHeaders, injectIngressHeaders } from "./infra";

const handleError = (reply: FastifyReply, error: Error) => {
  const message = error.message;
  console.error(message);
  reply.status(500).send(message);
};

const handleResponse = (reply: FastifyReply, result: unknown) => {
  // By default, status code is 200
  reply.status(200);

  if (typeof result === "number") {
    result = result.toString();
  } else {
    const response = JSON.parse(JSON.stringify(result));
    if (response["statusCode"]) {
      reply.status(response["statusCode"] as number);
    }
    if (response["headers"]) {
      for (const header in response["headers"]) {
        reply.header(header, response["headers"][header]);
      }
    }
    if (response["body"]) {
      result = response["body"];
    }
  }

  return reply.send(result);
};

export async function emulateCoreProcess(
  handler: Handler,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const event = formatHTTPEvent(request);
  injectIngressHeaders(request, event);

  const context = formatContext(handler);

  injectEgressHeaders(reply);

  await emulateSubruntime(handler, event, context, request, reply);
}

async function emulateSubruntime(
  handler: Handler,
  event: Event,
  context: Context,
  request: FastifyRequest,
  reply: FastifyReply
) {
  let responseSentByCallback = false;
  const callback: Callback = (error, result) => {
    responseSentByCallback = true;
    return error ? handleError(reply, error) : handleResponse(reply, result);
  };

  try {
    const functionResult = await handler(event, context, callback);
    if (!responseSentByCallback) {
      return handleResponse(reply, functionResult);
    }
  } catch (err) {
    return handleError(reply, new Error(`function invocation failed: ${err}`));
  }
}
