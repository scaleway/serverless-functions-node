export function handle (event, context, callback) {
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
};
