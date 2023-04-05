import {FastifyRequest} from "fastify";

const MAX_CONTENT_LENGTH = 6291456

export function isRejectedRequest(request: FastifyRequest): boolean {
    return request.url.toString() == "/favicon.ico" || request.url.toString() == "/robots.txt"
}

export function isValidContentLength(request: FastifyRequest): boolean {
    if (request.headers["content-length"]) {
        const length: number = +request.headers["content-length"];
        return length > MAX_CONTENT_LENGTH
    }
    return false
}