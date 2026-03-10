import { getPosts } from "@/lib/getPosts";
import Sidebar from "./SideBar";
import styles from "./page.module.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const posts = getPosts();

  return (
    <div className="bg-white">
      <div className={styles.container}>
        <Sidebar posts={posts} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}