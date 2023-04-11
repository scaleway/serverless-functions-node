import { pathToFileURL } from "url";

export function handle(event, context, callback) {
  return {
    body: "message",
    headers: {
      "Content-Type": ["text/plain"],
    },
  };
  // Or
  //return JSON.stringify({ message: "message" });
  // OR
  //return "Hello, world";
  // OR
  //return 1; // true, false, undefined, null...
}

/* Module was not imported but called directly, so we can test locally.
This will not be executed on Scaleway Functions */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("scaleway-functions-node").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
