import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";


const zodErrorMessage = (err: ZodError) => {
  const [firstIssue] = err.issues;
  const { path, message } = firstIssue;
  return `${path}: ${message}`;
};

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.log(`My console.log with the error:${err.name}`);
  //console.log(err);
  switch (err.name) {
    case "ZodError": {
      return send(res).badRequest(zodErrorMessage(err));
    }
    case "NotFoundError": {
      return send(res).notFound();
    }
    case "PrismaClientKnownRequestError": {
        return send(res).badRequest(`Error: May be you asked for something that doesn't exist.`)
    }
    default: {
      return send(res).internalError(`Internal error.`);
    }
  }
};

export const catchErrors =
  (myHandler: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await myHandler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
