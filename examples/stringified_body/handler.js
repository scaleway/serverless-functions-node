export function handle (event, context, callback) {
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Stringified body",
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }
}
