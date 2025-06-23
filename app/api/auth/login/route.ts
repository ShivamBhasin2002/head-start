import { API_URL } from "@/src/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, phoneNo } = await request.json();

    if (!name || !phoneNo) {
      return NextResponse.json(
        { error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        phoneNo,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Set cookies for authentication
    const responseWithCookies = NextResponse.json(data);
    responseWithCookies.cookies.set("username", name, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    responseWithCookies.cookies.set("number", phoneNo, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return responseWithCookies;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate user" },
      { status: 500 }
    );
  }
}
