import { getWikiItemsGroup, WikiItemMeta } from "@/lib/getWikiItems";
import styles from "./page.module.css";
import Link from "next/link";

type WikiEntry = {
  type: "header" | "item";
  filename: string;
  title: string
};

function filenameToTitle(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/_/g, ' ');
}

function splitWithHeaders(wikiItemsGroup: Record<string, WikiItemMeta[]>, numCols: number) {
  // Flatten into an array with letter headers
  const wikiWithHeaders: WikiEntry[] = [];
  Object.keys(wikiItemsGroup).sort().forEach((letter) => {
    wikiWithHeaders.push({ type: "header", filename: letter, title: letter });
    wikiItemsGroup[letter].forEach((item) => {
      wikiWithHeaders.push({ type: "item", filename: item.filename, title: filenameToTitle(item.filename) });
    });
  });

  const cols: Array<Array<WikiEntry>> = Array.from({ length: numCols }, () => []);
  const colSize = Math.floor(wikiWithHeaders.length / numCols);
  const remainder = wikiWithHeaders.length % numCols;
  for (let col = 0; col < numCols; col++) {
    const start = col * colSize + Math.min(col, remainder);
    const end = start + colSize + (col < remainder ? 1 : 0);
    cols[col] = wikiWithHeaders.slice(start, end);
  }
  return cols;
}

export default function WikiPage() {
  const wikiItemsGroup = getWikiItemsGroup();
  const columns = splitWithHeaders(wikiItemsGroup, 3);
  return (
    <main className={styles.wikiContainer}>
      <div className={styles.columns}>
        {columns.map((col, i) => (
          <div className={styles.column} key={i}>
            {col.map((entry, idx) => (
              entry.type === "header" ? (
                <div className={styles.wikiHeader} key={"header-" + entry.filename + idx}>
                  <h2 className={styles.wikiHeaderTitle}>{entry.title}</h2>
                </div>
              ) : (
                <div className={styles.wikiItem} key={"item-" + entry.filename + idx}>
                  <Link href={`/wiki/${entry.filename}`} className={styles.wikiItemTitle}>
                    <h2>{entry.title}</h2>
                  </Link>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
