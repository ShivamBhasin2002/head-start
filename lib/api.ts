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

export interface POI {
  poi_name: string;
  category: string;
  geo_location: [number, number];
  maps_url: string;
  website_url: string;
  photos_links: string[];
  city: string;
  tgid: string;
  source_link: string;
  added_at: string;
  pricing?: ProductPricing; // Add optional pricing information
}

export interface GetPoisResponse {
  success: boolean;
  phoneNo: string;
  pois: POI[];
  total_pois: number;
  message: string;
}

// Pricing interfaces for Headout API
export interface ListingPrice {
  currencyCode: string;
  originalPrice: number;
  finalPrice: number;
  minimumPayablePrice: number;
  type: string;
  otherPricesExist: boolean;
  bestDiscount: number;
  cashbackValue: number;
  cashbackType: string;
  groupSize: number | null;
  extraCharges: number;
  isPricingInclusiveOfExtraCharges: boolean;
}

export interface ProductPricing {
  id: number;
  name: string;
  listingPrice: ListingPrice;
  // Add other product fields as needed
}

export interface GetProductPricingResponse {
  success: boolean;
  data?: ProductPricing;
  message?: string;
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

// Get POIs API call
export async function getPois(): Promise<GetPoisResponse> {
  try {
    const response = await fetch("/api/pois", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get POIs: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Get POIs error:", error);
    throw error;
  }
}

// Get product pricing from Headout API
export async function getProductPricing(
  tourGroupId: number
): Promise<GetProductPricingResponse> {
  try {
    const response = await fetch(
      `https://api-ho.headout.com/api/v6/tour-groups/${tourGroupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any required headers for Headout API
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get product pricing: ${response.status}`);
    }

    const data = await response.json();

    // Extract pricing information from the response
    const pricingData: ProductPricing = {
      id: data.id,
      name: data.name,
      listingPrice: {
        currencyCode: data.listingPrice?.currencyCode || "EUR",
        originalPrice: data.listingPrice?.originalPrice || 0,
        finalPrice: data.listingPrice?.finalPrice || 0,
        minimumPayablePrice: data.listingPrice?.minimumPayablePrice || 0,
        type: data.listingPrice?.type || "PER_PERSON",
        otherPricesExist: data.listingPrice?.otherPricesExist || false,
        bestDiscount: data.listingPrice?.bestDiscount || 0,
        cashbackValue: data.listingPrice?.cashbackValue || 0,
        cashbackType: data.listingPrice?.cashbackType || "PERCENTAGE",
        groupSize: data.listingPrice?.groupSize || null,
        extraCharges: data.listingPrice?.extraCharges || 0,
        isPricingInclusiveOfExtraCharges:
          data.listingPrice?.isPricingInclusiveOfExtraCharges || false,
      },
    };

    return {
      success: true,
      data: pricingData,
    };
  } catch (error) {
    console.error("Get product pricing error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch product pricing",
    };
  }
}

// Get pricing for multiple products
export async function getMultipleProductPricing(
  tourGroupIds: number[]
): Promise<Record<number, ProductPricing>> {
  const pricingMap: Record<number, ProductPricing> = {};

  // Fetch pricing for each tour group ID
  const pricingPromises = tourGroupIds.map(async (id) => {
    try {
      const result = await getProductPricing(id);
      if (result.success && result.data) {
        pricingMap[id] = result.data;
      }
    } catch (error) {
      console.error(`Failed to fetch pricing for tour group ${id}:`, error);
    }
  });

  await Promise.all(pricingPromises);
  return pricingMap;
}

// Enhanced POI fetch with pricing information
export async function getPoisWithPricing(): Promise<GetPoisResponse> {
  try {
    const poisResponse = await getPois();

    if (!poisResponse.success || !poisResponse.pois) {
      return poisResponse;
    }

    // Extract tour group IDs from POIs (assuming tgid contains the tour group ID)
    const tourGroupIds = poisResponse.pois
      .map((poi) => {
        // Try to extract tour group ID from tgid or other fields
        const match = poi.tgid?.match(/\d+/);
        return match ? parseInt(match[0]) : null;
      })
      .filter((id): id is number => id !== null);

    // Fetch pricing for all tour group IDs
    const pricingMap = await getMultipleProductPricing(tourGroupIds);

    // Attach pricing information to POIs
    const poisWithPricing = poisResponse.pois.map((poi) => {
      const match = poi.tgid?.match(/\d+/);
      const tourGroupId = match ? parseInt(match[0]) : null;

      return {
        ...poi,
        pricing: tourGroupId ? pricingMap[tourGroupId] : undefined,
      };
    });

    return {
      ...poisResponse,
      pois: poisWithPricing,
    };
  } catch (error) {
    console.error("Failed to fetch POIs with pricing:", error);
    return {
      success: false,
      phoneNo: "",
      pois: [],
      total_pois: 0,
      message: "Failed to fetch POIs with pricing",
    };
  }
}
