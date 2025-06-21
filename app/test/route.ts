import type { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req);
  try {
    const body = await req.json();
    console.log(body, "req.body");
    return new Response(JSON.stringify({ message: "Request body logged" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
