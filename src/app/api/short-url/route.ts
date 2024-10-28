import { NextResponse } from 'next/server';
import { insertShortLink } from '@/database/shortLink';
import { z } from 'zod';

// Define a Zod schema for request validation
const requestSchema = z.object({
  value: z.string().url("Please enter a valid URL."),
  ownerID: z.string(),
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const parsedBody = requestSchema.parse(body);
    
    // Extract values
    const { value, ownerID } = parsedBody;

    if (!value || !ownerID) throw new Error("Please provide a proper input")

    // Call the function to insert the short link
    const shortUrl = await insertShortLink(value, ownerID);

    // Return the short URL in the response
    return NextResponse.json({ shortUrl }, { status: 201 });
  } catch (error) {
    // Handle validation or other errors
    return NextResponse.json({ error: error instanceof Error ? error.message : "An error occurred" }, { status: 400 });
  }
}
