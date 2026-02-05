"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import styles from "./page.module.css";
import 'github-markdown-css'

type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  video?: string;
};

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [selectedId, setSelectedId] = useState<string>(posts[0]?.id ?? "");
  const selected = posts.find((p) => p.id === selectedId) ?? posts[0];

  return (
    <div className={styles.container}>
      <aside className={styles.list} aria-label="Blog posts">
        {posts.map((p) => (
          <button
            key={p.id}
            className={p.id === selectedId ? `${styles.listItem} ${styles.active}` : styles.listItem}
            onClick={() => setSelectedId(p.id)}
            aria-current={p.id === selectedId ? "true" : undefined}
          >
            <div className={styles.title}>{p.title}</div>
            <div className={styles.meta}>{new Date(p.date).toLocaleDateString()}</div>
          </button>
        ))}
      </aside>

      <main className={styles.content}>
        {selected ? (
          <article>
            {selected.video && (
              <div className={styles.video}>
                <video controls src={selected.video} style={{ maxWidth: '100%', borderRadius: 8 }} />
              </div>
            )}
            <div className="markdown-body">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{selected.content}</ReactMarkdown>
            </div>
          </article>
        ) : (
          <div>Select a post</div>
        )}
      </main>
    </div>
  );
}
