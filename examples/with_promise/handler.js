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
