import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your logic here
    const documents = [];
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}