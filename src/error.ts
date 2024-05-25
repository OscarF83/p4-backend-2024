import type { ErrorRequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";


 /* 
 return send(res).badRequest(`Missing 'lastName' field or incorrect data type`);
 send(res).internalError(`Could not get technicians`);
 send(res).internalError(`Couldn't create new technician. Try again later...`);

 if (e.name === "NotFoundError") {
      return send(res).notFound();
    }
    send(res).internalError(`Internal error`);
    
 */
const zodErrorMessage = (err: ZodError) => {
        const [ firstIssue ] = err.issues;
        const { path, message } = firstIssue;
        return `${path}: ${message}`
}

export const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`My console.log with the error:${err.name}`);
    //console.log(err);
    switch (err.name) {
        case "ZodError": {
            return send(res).badRequest(zodErrorMessage(err));
        }
        case "NotFoundError": {
            return send(res).notFound();
        }
        default: {
            return send(res).internalError(`Internal error.`)
        }
    }
}