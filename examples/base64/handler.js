import { pathToFileURL } from "url";

// Using the "isBase64Encoded" property in the response object, you can return a base64 encoded image
// The object will be automatically converted back to binary by the runtime.
async function handler(event, context, callback) {
  const resp = await fetch("https://http.cat/images/200.jpg");

  const buf = await resp.arrayBuffer();
  const b64Cat = Buffer.from(buf).toString("base64");

  return {
    statusCode: 200,
    body: b64Cat,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/jpeg",
    },
  };
}

// This will execute when testing locally, but not when the function is launched
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("@scaleway/serverless-functions").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handler, 8080);
  });
}
