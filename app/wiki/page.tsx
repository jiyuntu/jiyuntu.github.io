import { getWikiItemsGroup, WikiItemMeta } from "@/lib/getWikiItems";
import styles from "./page.module.css";
import Link from "next/link";

function splitWithHeaders(wikiItemsGroup: Record<string, WikiItemMeta[]>, numCols: number) {
  // Flatten into an array with letter headers
  const wikiWithHeaders: { type: "header" | "item"; value: string }[] = [];
  Object.keys(wikiItemsGroup).sort().forEach((letter) => {
    wikiWithHeaders.push({ type: "header", value: letter });
    wikiItemsGroup[letter].forEach((item) => {
      wikiWithHeaders.push({ type: "item", value: item.title });
    });
  });

  const cols: Array<Array<{ type: "header" | "item"; value: string }>> = Array.from({ length: numCols }, () => []);
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
                <div className={styles.wikiHeader} key={"header-" + entry.value + idx}>
                  <h2 className={styles.wikiHeaderTitle}>{entry.value}</h2>
                </div>
              ) : (
                <div className={styles.wikiItem} key={"item-" + entry.value + idx}>
                  <Link href={`/wiki/${entry.value}`} className={styles.wikiItemTitle}>
                    <h2>{entry.value}</h2>
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
