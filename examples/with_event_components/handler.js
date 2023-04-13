import { pathToFileURL } from "url";

export function handle(event, context, callback) {
  const queryStringParameters = event.queryStringParameters;
  const body = event.body;

  return {
    statusCode: 201,
    body: JSON.stringify({
      queryStringParameters: queryStringParameters,
      body: body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

/* Module was not imported but called directly, so we can test locally.
This will not be executed on Scaleway Functions */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("@scaleway/serverless-functions").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
