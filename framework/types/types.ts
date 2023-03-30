type RequestContext = {
    accountId: string;
    resourceId: string;
    stage: string;
    requestId: string;
    resourcePath: string;
    authorizer: Record<string, unknown> | null;
    httpMethod: string;
    apiId: string;
}

type Event = {
    resource: string;
    path: string;
    httpMethod: string;
    headers: Record<string, unknown> | null;
    multiValueHeaders: Record<string, string[]> | null;
    queryStringParameters: Record<string, string> | null;
    multiValueQueryStringParameters: Record<string, string[]> | null;
    pathParameters: null;
    stageVariables: Record<string, string>;
    requestContext: RequestContext;
    body: string;
    isBase64Encoded?: boolean;
}

type Context = {
    memoryLimitInMb: number;
    functionName: string;
    functionVersion: string;
}

type ResponseRecord = {
    body?: string | Record<string, unknown>;
    headers?: Record<string, string>;
    statusCode?: number;
    isBase64Encoded?: boolean;
}

type Callback = {
    (error: Error | undefined, result: string | ResponseRecord): void
}

export type Handler = (
    event: Event,
    context: Context,
    callback: Callback
) => string | ResponseRecord | Promise<string> | Promise<ResponseRecord>