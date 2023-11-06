import { fastify, FastifyReply, FastifyRequest } from "fastify";
import plugin = require("@fastify/url-data");
import { Handler } from "../types/types";
import { isRejectedRequest, isValidContentLength } from "./http";
import { emulateCoreProcess } from "./serving";

export function serveHandler(handler: Handler, port = 8080) {
  const server = fastify();
  server.register(plugin);

  server.addContentTypeParser(
    "text/json",
    { parseAs: "string" },
    server.defaultTextParser,
  );

  server.addContentTypeParser(
    "application/x-www-form-urlencoded",
    { parseAs: "string" },
    server.defaultTextParser,
  );

  server.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    server.defaultTextParser,
  );

  server.addContentTypeParser(
    "multipart/form-data",
    function (request, payload, done) {
      let body = "";
      payload.on("data", d => {
        body += d;
      });
      payload.on("end", () => {
        done(null, body);
      });
    },
  );

  // Emulate core preprocess
  server.addHook("preValidation", function (request, reply, done) {
    // Emulate the CoreRT guard
    if (isRejectedRequest(request)) {
      console.error(
        "request will be rejected for calling favicon.ico or robots.txt",
      );
    }
    if (isValidContentLength(request)) {
      console.error("request can be rejected because it's too big");
    }
    done();
  });

  server.addHook("onRequest", function (request, reply, done) {
    // Those headers are added for convenience, but will be overwritten if set in the handler
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Headers", "Content-Type");
    done();
  });

  const serverFactory = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    await emulateCoreProcess(handler, request, reply);
  };

  server.all("/*", serverFactory);

  server.listen({ port: port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}
