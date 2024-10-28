import { NextResponse } from 'next/server';
import { getShortLink } from '@/database/shortLink';

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const { key } = params;

  try {
    // Fetch the short link from the database
    const shortLink = await getShortLink(key);

    if (!shortLink) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    // Redirect to the original URL
    return NextResponse.redirect(shortLink.value);
  } catch (error) {
    console.error('Error fetching short link:', error);
    return NextResponse.json({ error: 'Failed to redirect' }, { status: 500 });
  }
}
