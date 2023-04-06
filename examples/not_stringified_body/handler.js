export function handle(event, context, callback) {
  return {
    statusCode: 201,
    body: {
      message: "Not Stringified body",
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
}
