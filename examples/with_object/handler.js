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
