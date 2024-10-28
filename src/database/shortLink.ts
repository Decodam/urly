import { eq } from "drizzle-orm";
import { db } from "./db";
import { shortLinks } from "./schema";

function generateUniqueKey(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function insertShortLink(value: string, ownerID: string) {
  const uniqueKey = generateUniqueKey(8);

  await db.insert(shortLinks).values({
    key: uniqueKey,
    value: value,
    ownerID: ownerID,
  });
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
