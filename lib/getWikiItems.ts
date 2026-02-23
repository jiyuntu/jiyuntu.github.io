import fs from 'fs';
import path from 'path';

export type WikiItemMeta = {
  filename: string;
};

export function getWikiItems(): WikiItemMeta[] {
  const wikiItemsDir = path.join(process.cwd(), 'wiki');
  if (!fs.existsSync(wikiItemsDir)) return [];
  const files = fs.readdirSync(wikiItemsDir).filter((f) => f.endsWith('.md'));

  const wikiItems = files.map((file) => {
    return {
      filename: file,
    };
  });
  return wikiItems;
}

export function getWikiItemsGroup(): Record<string, WikiItemMeta[]> {
  const wikiItems = getWikiItems();
  const grouped = wikiItems.reduce((acc, item) => {
    const letter = item.filename[0];
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {} as Record<string, WikiItemMeta[]>);
  return grouped;
}