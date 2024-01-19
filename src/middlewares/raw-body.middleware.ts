import { Request, Response } from "express";
import { json } from "body-parser";

interface IRequestWithRawBody extends Request {
  rawBody: Buffer;
}
export function rawBodyMiddleware() {
  return json({
    verify: (
      request: IRequestWithRawBody,
      response: Response,
      buffer: Buffer,
    ) => {
      if (request.url === "/stripe/webhook" && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}
