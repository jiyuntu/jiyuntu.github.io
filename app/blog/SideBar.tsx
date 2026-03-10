"use client";

import { PostMeta } from "@/lib/getPosts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";

export default function Sidebar({ posts }: { posts: PostMeta[] }) {
  const pathname = usePathname();

  return (
    <aside className={styles.list} aria-label="Blog posts">
      {posts.map((p) => {
        const href = `/blog/${p.id}`;
        const isActive = pathname === href;

        return (
          <Link
            key={p.id}
            href={href}
            className={isActive ? `${styles.listItem} ${styles.active}` : styles.listItem}
            aria-current={isActive ? "page" : undefined}
          >
            <div className={styles.title}>{p.title}</div>
            <div className={styles.meta}>{new Date(p.date).toLocaleDateString()}</div>
          </Link>
        );
      })}
    </aside>
  );
}