import {Context, Handler} from "../types/types";

export function formatContext(handler: Handler): Context {
    return {
        memoryLimitInMb: 128,
        functionName: handler.name,
        functionVersion: ""
    }
}