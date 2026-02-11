'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import 'github-markdown-css'

export default function WikiItemPage() {
  const searchParams = useSearchParams();
  const wikiItemTitle = searchParams.get("wikiItemTitle") || "";
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchContent() {
      const file = `/wiki/${wikiItemTitle}.md`;
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error("Not found");
        const text = await res.text();
        // Remove frontmatter if present
        const match = text.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
        setContent(match ? match[1].trim() : text);
      } catch {
        setContent("Not found.");
      }
    }
    fetchContent();
  }, [wikiItemTitle]);

  return (
    <main>
      <article>
        <div className="markdown-body">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
