import { STATUS_CODES } from "http";

import { S3 } from "@aws-sdk/client-s3";
import { getBoundary, parse } from "parse-multipart-data";
import { pathToFileURL } from "url";

const BUCKET_NAME = process.env.BUCKET_NAME;
const S3_REGION = process.env.S3_REGION;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_KEY = process.env.SECRET_KEY;

// Create S3 service object
const s3 = new S3({
  endpoint: `https://s3.${S3_REGION}.scw.cloud`,
  region: S3_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_KEY,
  },
});

export const handle = async (event, _context, cb) => {
  if (
    !event.headers["content-type"] ||
    !event.headers["content-type"].startsWith("multipart/form-data")
  ) {
    return { statusCode: 400, body: STATUS_CODES[400] };
  }

  const boundary = getBoundary(event.headers["content-type"]);
  const parts = parse(Buffer.from(event["body"], "utf-8"), boundary);

  let promises = [];
  for (const part of parts) {
    console.log(`Saving object ${part.filename} to bucket ${BUCKET_NAME}...`);
    promises.push(
      s3.putObject({
        Bucket: BUCKET_NAME,
        Key: part.filename,
        Body: part.data,
      })
    );
  }

  try {
    await Promise.all(promises);
    return {
      statusCode: 200,
      body: `Successfully uploaded ${parts
        .map(f => f.filename)
        .join(",")} to ${BUCKET_NAME}`,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};

/* Module was not imported but called directly, so we can test locally.
This will not be executed on Scaleway Functions */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("scaleway-functions-node").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
