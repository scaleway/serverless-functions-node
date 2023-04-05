import {handle} from "./stringified_body/handler.js"
import {serveHandler} from 'scaleway-functions-node'

serveHandler(handle, 8080);