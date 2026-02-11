import fs from 'fs';
import path from 'path';

export type WikiItemMeta = {
  title: string;
};

export function getWikiItems(): WikiItemMeta[] {
  const wikiItemsDir = path.join(process.cwd(), 'public/wiki');
  if (!fs.existsSync(wikiItemsDir)) return [];
  const files = fs.readdirSync(wikiItemsDir).filter((f) => f.endsWith('.md'));

  const wikiItems = files.map((file) => {
    const full = path.join(wikiItemsDir, file);
    const raw = fs.readFileSync(full, 'utf8');

    let title = file.replace(/\.md$/, '');
    return {
      title,
    };
  });

  wikiItems.sort((a, b) => a.title.localeCompare(b.title));
  return wikiItems;
}