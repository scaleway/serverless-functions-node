import { pathToFileURL } from "url";

export function handle(event, context, callback) {
  const response = {
    statusCode: 201,
    body: {
      message: "function using callback",
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Successful response
  callback(undefined, response);
  // Error response
  callback(new Error("something bad happened..."));
}

/* Module was not imported but called directly, so we can test locally.
This will not be executed on Scaleway Functions */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("@scaleway/serverless-functions").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
