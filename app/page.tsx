import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <Link href="/blog" className={styles.link}>
          Blog
        </Link>
        <Link href="/badminton" className={styles.link}>
          Badminton
        </Link>
        <Link href="/wiki" className={styles.link}>
          Wiki
        </Link>
      </div>
    </main>
  );
}
