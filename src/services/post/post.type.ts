export type Post = {
  uuid: string | null;
  url: string | null;
  parent_url: string | null;
  author: string | null;
  title: string | null;
  text: string | null;
  highlightText: string | null;
  highlightTitle: string | null;
  highlightThreadTitle: string | null;
  language: string | null;
  sentiment: string | null;
};
