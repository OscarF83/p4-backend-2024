import type { ErrorRequestHandler } from "express";
import { send } from "./response";


 /* 
 return send(res).badRequest(`Missing 'lastName' field or incorrect data type`);
 send(res).internalError(`Could not get technicians`);
 send(res).internalError(`Couldn't create new technician. Try again later...`);

 if (e.name === "NotFoundError") {
      return send(res).notFound();
    }
    send(res).internalError(`Internal error`);
    
 */

export const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`My console.log with the error:${err}`);
    send(res).internalError(`Internal error.`);
}