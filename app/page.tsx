import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className={styles.container}>
        <Link href="/badminton" className={styles.link}>
          Badminton
        </Link>
      </main>
    </div>
  );
}