import { getWikiItems, WikiItemMeta } from "@/lib/getWikiItems";
import styles from "./page.module.css";
import Link from "next/link";

function splitIntoColumns(arr: WikiItemMeta[], numCols: number) {
  const cols: WikiItemMeta[][] = Array.from({ length: numCols }, () => []);
  const colSize = Math.ceil(arr.length / numCols);
  for (let col = 0; col < numCols; col++) {
    cols[col] = arr.slice(col * colSize, (col + 1) * colSize);
  }
  return cols;
}

export default function WikiPage() {
  const wikiItems = getWikiItems();
  const columns = splitIntoColumns(wikiItems, 3);
  return (
    <main className={styles.wikiContainer}>
      <h1 className={styles.heading}>Wiki</h1>
      <div className={styles.columns}>
        {columns.map((col, i) => (
          <div className={styles.column} key={i}>
            {col.map((wikiItem) => (
              <div className={styles.wikiItem} key={wikiItem.title}>
                <Link href={`/wiki/${wikiItem.title}`} className={styles.wikiItemTitle}>
                  <h2>{wikiItem.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
