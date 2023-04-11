import { pathToFileURL } from "url";

export function handle(event, context, callback) {
  const response = {
    statusCode: 201,
    body: {
      message: "async function",
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const day = new Date().getDay();
    let err = undefined;
    if (day === 0 || day === 6) {
      err = new Error("Weekend are for resting");
    }
    if (err) return reject(err);
    return resolve(response);
  });
}

/* Module was not imported but called directly, so we can test locally.
This will not be executed on Scaleway Functions */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("scaleway-functions-node").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
