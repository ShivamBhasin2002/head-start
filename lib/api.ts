// API utility functions for making requests to our server-side routes

export interface LoginRequest {
  name: string;
  phoneNo: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: any;
}

export interface UserInfo {
  name: string;
  phoneNo: string;
  // Add other user fields as needed
}

export interface City {
  name: string;
}

// Login API call
export async function loginUser(
  credentials: LoginRequest
): Promise<LoginResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Get user info API call
export async function getUserInfo(): Promise<UserInfo> {
  try {
    const response = await fetch("/api/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user info: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
}

// Get cities API call
export async function getCities(): Promise<string[]> {
  try {
    const response = await fetch("/api/cities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get cities: ${response.status}`);
    }

    const data = await response.json();
    return data.cities || data || [];
  } catch (error) {
    console.error("Get cities error:", error);
    throw error;
  }
}

// Logout function (clears cookies)
export async function logout(): Promise<void> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status}`);
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
