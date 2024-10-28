import { eq } from "drizzle-orm";
import { db } from "./db";
import { shortLinks } from "./schema";
import { siteUrl } from "@/lib/constant";

function generateUniqueKey(length: number): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function insertShortLink(value: string, ownerID: string) {
  const maxAttempts = 5; // Maximum attempts before failing
  let uniqueKey;
  let attempts = 0;
  let currentLength = 7; // Start with a length of 7

  while (attempts < maxAttempts) {
    uniqueKey = generateUniqueKey(currentLength);

    // Check if the generated key already exists in the database
    const existingLink = await db
      .select()
      .from(shortLinks)
      .where(eq(shortLinks.key, uniqueKey))
      .execute();

    if (existingLink.length === 0) {
      // If the key is unique, insert the link
      await db.insert(shortLinks).values({
        key: uniqueKey,
        value: value,
        ownerID: ownerID,
      });
      return `${siteUrl}/${uniqueKey}`; // Return the full URL
    }

    // If the key is not unique, increase the length for the next attempt
    currentLength++;
    attempts++;
  }

  // If we exceed the maximum attempts, throw an error
  throw new Error("Failed to generate a unique key after multiple attempts.");
}

export async function getShortLink(key: string) {
  const shortLink = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.key, key))
    .execute();

  return shortLink.length > 0 ? shortLink[0] : null;
}

export async function deleteShortLink(key: string) {
  const result = await db
    .delete(shortLinks)
    .where(eq(shortLinks.key, key))
    .execute();

  return result;
}
