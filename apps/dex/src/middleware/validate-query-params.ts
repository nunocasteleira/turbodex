/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ValidationError } from "@/models/validation-error";

export function validateQueryParams<T>(
  schema: z.ZodObject<any>,
  handler: NextApiHandler
) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<T | ValidationError>
  ) => {
    try {
      schema.parse(req.query);
    } catch (error: any) {
      return res.status(400).json({ errors: error });
    }
    await handler(req, res);
  };
}
