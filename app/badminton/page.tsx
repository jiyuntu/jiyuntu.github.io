import Link from 'next/link';

export default function Badminton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main style={styles.container}>
        <Link href="/badminton/six-point" style={styles.link}>
          Six-Point Footwork
        </Link>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontWeight: 'bold',
  },
  link: {
    fontSize: '2rem',
    color: 'white',
    cursor: 'pointer',
  },
};
