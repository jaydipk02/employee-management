import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchCountries } from "./fetchCountries";

vi.mock("axios");

describe("fetchCountries Thunk", () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  it("should return data when API call is successful", async () => {
    const mockCountries = [
      { id: "1", name: "India" },
      { id: "2", name: "USA" }
    ];

   
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    const dispatch = vi.fn();
    const thunk = fetchCountries();
    
   
    const result = await thunk(dispatch, () => ({}), {});

    
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/country")
    );
    expect(result.type).toBe("countries/fetchCountries/fulfilled");
    expect(result.payload).toEqual(mockCountries);
  });

  it("should return error message when API call fails", async () => {
    const errorMessage = "Network Error";
    
    axios.get.mockRejectedValueOnce({ message: errorMessage });

    const dispatch = vi.fn();
    const thunk = fetchCountries();
    
    const result = await thunk(dispatch, () => ({}), {});

    expect(result.type).toBe("countries/fetchCountries/rejected");
    expect(result.payload).toBe(errorMessage);
  });
});