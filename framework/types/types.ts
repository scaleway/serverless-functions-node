export type RequestContext = {
    accountId: string;
    resourceId: string;
    stage: string;
    requestId: string;
    resourcePath: string;
    authorizer: Record<string, unknown> | null;
    httpMethod: string;
    apiId: string;
}

export type Event = {
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

export type Context = {
    memoryLimitInMb: number;
    functionName: string;
    functionVersion: string;
}

export type Callback = {
    (error: Error | undefined, result: unknown): void
}

export type Handler = (
    event: Event,
    context: Context,
    callback: Callback
) => unknown | Promise<unknown>;
