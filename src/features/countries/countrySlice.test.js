import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import countryReducer, { fetchCountries } from "./countrySlice";


vi.mock("axios");

describe("Country Slice", () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  
  it("should return the initial state when no action is passed", () => {
    const result = countryReducer(undefined, { type: "unknown" });
    expect(result).toEqual(initialState);
  });


  it("should set loading to true when fetchCountries.pending is dispatched", () => {
    const action = { type: fetchCountries.pending.type };
    const state = countryReducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  
  it("should update list and set loading to false when fetchCountries.fulfilled is dispatched", () => {
    const mockPayload = [
      { id: "1", name: "India" },
      { id: "2", name: "USA" }
    ];
    const action = { 
      type: fetchCountries.fulfilled.type, 
      payload: mockPayload 
    };
    
    const state = countryReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.list).toEqual(mockPayload);
  });

  it("should set error message and loading to false when fetchCountries.rejected is dispatched", () => {
    const mockError = "Failed to fetch countries";
    const action = { 
      type: fetchCountries.rejected.type, 
      payload: mockError 
    };
    
    const state = countryReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
    expect(state.list).toEqual([]);
  });
});