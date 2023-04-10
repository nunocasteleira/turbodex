import { z } from "zod";

export const dexQuerySchema = z.object({
  dex: z.string(),
});

export type DexQuerySchema = z.TypeOf<typeof dexQuerySchema>;
