import * as https from "https";
import { pathToFileURL } from "url";

// GET request sample
export async function handle(event, context) {
  let dataString = "";

  const response = await new Promise((resolve, reject) => {
    const req = https.get(
      "https://pokeapi.co/api/v2/pokemon/ditto",
      function (res) {
        res.on("data", chunk => {
          dataString += chunk;
        });

        res.on("end", () => {
          resolve({
            statusCode: 200,
            headers: { "Content-Type": ["application/json"] },
            body: JSON.stringify(JSON.parse(dataString), null, 4),
          });
        });
      }
    );

    req.on("error", e => {
      reject({
        statusCode: 500,
        body: "Something went wrong!",
      });
    });
  });

  return response;
}

// POST request sample
/*export async function handle (event, context) {
    let dataString = "";

    const postData = JSON.stringify({
        name: "John Doe",
        email: "jdoe@scaleway.com",
    });

    const options = {
        hostname: "postman-echo.com",
        path: "/post",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.on("data", (chunk) => {
                dataString += chunk;
            });

            res.on("end", () => {
                resolve({
                    statusCode: 200,
                    headers: { "Content-Type": ["application/json"] },
                    body: JSON.stringify(JSON.parse(dataString), null, 4),
                });
            });

            res.on("error", (e) => {
                reject({
                    statusCode: 500,
                    body: "Something went wrong!",
                });
            });
        });
        // write data to request body
        req.write(postData);
        req.end();
    });

    return response;
}*/

/* Module was not imported but called directly, so we can test locally.
This will not be executed on Scaleway Functions */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("@scaleway/serverless-functions").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
