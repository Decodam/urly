import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOwnerShortLinks } from "@/database/shortLink";
import { URLSearchParams } from "url";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    let ownerId = userId;

    if (!ownerId) {
      // Parse the request URL to get query parameters
      const url = new URL(request.url);
      const params = new URLSearchParams(url.search);
      const queryOwnerId = params.get("ownerID");

      // Check if `ownerID` is provided and starts with "local_"
      if (queryOwnerId && queryOwnerId.startsWith("local_")) {
        ownerId = queryOwnerId;
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Fetch the URLs for the owner ID (authenticated user or anonymous with valid ownerID)
    const ownerLinks = await getOwnerShortLinks(ownerId);

    // Return the URLs in the response
    return NextResponse.json(ownerLinks, { status: 200 });
  } catch (error) {
    console.error("Error fetching owner links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links." },
      { status: 500 }
    );
  }
}
