import { Post } from "./post.type";

export async function savePost(db, post: Post): Promise<void> {
  const client = await db.connect();
  try {
    const queryText = `
                    INSERT INTO posts (
                        uuid,
                        url,
                        parent_url,
                        author,
                        title,
                        text,
                        highlight_text,
                        highlight_title,
                        highlight_thread_title,
                        language,
                        sentiment
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

    const values = [
      post.uuid || "",
      post.url || "",
      post.parent_url || "",
      post.author || "",
      post.title || "",
      post.text || "",
      post.highlightText || "",
      post.highlightTitle || "",
      post.highlightThreadTitle || "",
      post.language || "",
      post.sentiment || "",
    ];

    await client.query(queryText, values);
  } catch (error) {
    console.error("Error saving post:", error);
  } finally {
    await client.release();
  }
}
