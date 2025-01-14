import axios from "axios";
import { Pool } from "pg";
import { savePost } from "../src/services/post/postService";
import {
  fetchData,
  fetchPosts,
  handler,
} from "../src/services/webhouse/webHouseService";

jest.mock("axios");
jest.mock("pg");
jest.mock("../src/services/post/postService");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockSavePost = savePost as jest.MockedFunction<typeof savePost>;

const mockClient = {
  query: jest.fn(),
  release: jest.fn(),
};

const mockPool = new Pool();
mockPool.connect.mockResolvedValue(mockClient as any);

describe("fetchData", () => {
  it("should fetch data from the provided URL", async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await fetchData("https://example.com/api");

    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://example.com/api");
  });

  it("should throw an error if the request fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchData("https://example.com/api")).rejects.toThrow(
      "Network Error"
    );
  });
});

describe("fetchPosts", () => {
  it("should fetch posts and call the callback ", async () => {
    const mockData = {
      totalResults: 3,
      moreResultsAvailable: 1,
      posts: [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const callback = jest.fn();

    await fetchPosts("test query", 2, callback);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(savePost).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(2, 1);
  });

  it("should handle errors gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    const callback = jest.fn();

    await fetchPosts("test query", 10, callback);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockSavePost).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(0, 0);
  });
});

describe("handler", () => {
  it("should call fetchPosts with the correct query and limit", async () => {
    const mockData = {
      totalResults: 3,
      moreResultsAvailable: 1,
      posts: [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const callback = jest.fn();

    await handler({ queryString: "test query", limit: 2 }, callback);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(savePost).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(2, 1);
  });

  it("should use the default query if none is provided", async () => {
    const mockData = {
      totalResults: 10,
      moreResultsAvailable: 0,
      posts: [{ id: 1, title: "Post 1" }],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const callback = jest.fn();

    await handler({ queryString: "", limit: null }, callback);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(savePost).toHaveBeenCalledTimes(0);
    expect(callback).toHaveBeenCalledWith(1, 9);
  });
});
