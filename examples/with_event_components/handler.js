export function handle (event, context, callback) {
    const queryStringParameters = event.queryStringParameters;
    const body = event.body;

    return {
        statusCode: 201,
        body: JSON.stringify({
            queryStringParameters: queryStringParameters,
            body: body,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };
};