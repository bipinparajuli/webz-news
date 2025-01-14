import { Pool } from "pg";
import { savePost } from "../src/services/post/postService";

jest.mock("pg");

const mockClient = {
  query: jest.fn(),
  release: jest.fn(),
};

const mockPool = new Pool();
mockPool.connect.mockResolvedValue(mockClient);

describe("savePost", () => {
  it("should save the post to the database", async () => {
    const post = {
      uuid: "1234",
      url: "http://example.com",
      parent_url: "",
      author: "Author",
      title: "Title",
      text: "Text",
      highlightText: "Highlight Text",
      highlightTitle: "Highlight Title",
      highlightThreadTitle: "Highlight Thread Title",
      language: "en",
      sentiment: "positive",
    };
    await savePost(mockPool, post);

    const expectedValues = [
      post.uuid,
      post.url,
      post.parent_url,
      post.author,
      post.title,
      post.text,
      post.highlightText,
      post.highlightTitle,
      post.highlightThreadTitle,
      post.language,
      post.sentiment,
    ];

    expect(mockClient.query).toHaveBeenCalled();
    expect(mockClient.query).toHaveBeenCalledWith(
      expect.any(String),
      expectedValues
    );
    expect(mockClient.release).toHaveBeenCalled();
  });
});
