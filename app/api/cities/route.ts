import { API_URL } from "@/src/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get phone number from cookies
    const phone = request.cookies.get("number")?.value;

    if (!phone) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Make request to get cities
    const response = await fetch(`${API_URL}/api/v1/getCities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phoneNo: phone,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Get cities API responded with status: ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Get cities API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities data" },
      { status: 500 }
    );
  }
}
