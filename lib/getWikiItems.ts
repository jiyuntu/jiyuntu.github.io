import fs from 'fs';
import path from 'path';

export type WikiItemMeta = {
  title: string;
};

export function getWikiItemsGroup(): Record<string, WikiItemMeta[]> {
  const wikiItemsDir = path.join(process.cwd(), 'wiki');
  if (!fs.existsSync(wikiItemsDir)) return {};
  const files = fs.readdirSync(wikiItemsDir).filter((f) => f.endsWith('.md'));

  const wikiItems = files.map((file) => {
    const full = path.join(wikiItemsDir, file);
    const raw = fs.readFileSync(full, 'utf8');

    let title = file.replace(/\.md$/, '');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return {
      title,
    };
  });

  const grouped = wikiItems.reduce((acc, item) => {
    const letter = item.title[0];
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {} as Record<string, WikiItemMeta[]>);
  return grouped;
}