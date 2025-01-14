import axios from "axios";
import { db } from "../../database";
import { Post } from "../post/post.type";
import { config } from "../../config/config";
import { savePost } from "../post/postService";

const API_HOST = "https://api.webz.io";
const API_KEY = config.apiKey;

async function fetchData(url: string) {
  const response = await axios.get(url);

  const data = response.data;
  return data;
}

async function fetchPosts(
  query: string,
  limit: number,
  callback: (retrievedCount: number, totalCount: number) => void
): Promise<void> {
  const posts: Post[] = [];
  let moreResults = true;
  let totalCount = 0;
  let next;
  while (moreResults && posts.length < limit) {
    try {
      let apiUrl = `${API_HOST}/filterWebContent?token=${API_KEY}&q=${query}&format=json`;
      if (next) {
        apiUrl = `${API_HOST}${next}`;
      }
      console.log("Fetching posts from:", apiUrl);
      const data = await fetchData(apiUrl);
      totalCount = data.totalResults;
      moreResults = data.moreResultsAvailable > 0;
      posts.push(...data.posts);
      next = data.next;
    } catch (error) {
      console.error("Error:", error);
      moreResults = false;
    }
  }

  if (moreResults) {
    console.log("Saving post...");
    for (const post of posts) {
      await savePost(db, post);
    }
    console.log("Post saved completed:");
  }

  callback(posts.length, totalCount - posts.length);
}

async function handler(
  options: { queryString: string; limit: number },
  callback: (retrievedCount: number, totalCount: number) => void
): Promise<void> {
  const query = options.queryString || "site_type:news language:english";
  const limit = options.limit || 200;

  await fetchPosts(query, limit, callback);
}

export { fetchPosts, handler, fetchData };
