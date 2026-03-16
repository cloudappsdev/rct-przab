// src/lib/prisma-safe.ts

import { Prisma } from "@prisma-client";

type SafeResult<T> = { data: T; error: null } | { data: null; error: string };

export async function safeQuery<T>(
  query: () => Promise<T>,
): Promise<SafeResult<T>> {
  try {
    const data = await query();
    return { data, error: null };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        data: null,
        error: `DB error [${error.code}]: ${error.message}`,
      };
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return { data: null, error: "Query validation failed" };
    }
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return { data: null, error: "Could not connect to database" };
    }
    return { data: null, error: "Unexpected server error" };
  }
}
