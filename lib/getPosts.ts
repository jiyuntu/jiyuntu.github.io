import fs from 'fs';
import path from 'path';

type PostMeta = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export function getPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), 'posts');
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

  const posts = files.map((file) => {
    const full = path.join(postsDir, file);
    const raw = fs.readFileSync(full, 'utf8');

    // very small frontmatter parser (YAML-like)
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let title = file.replace(/\.md$/, '');
    let date = '';
    let content = raw;

    if (fmMatch) {
      const fm = fmMatch[1];
      content = fmMatch[2].trim();
      const titleMatch = fm.match(/title:\s*"?([^"\n]+)"?/);
      const dateMatch = fm.match(/date:\s*"?([^"\n]+)"?/);
      if (titleMatch) title = titleMatch[1];
      if (dateMatch) date = dateMatch[1];
    }

    return {
      id: file.replace(/\.md$/, ''),
      title,
      date,
      content,
    };
  });

  // sort desc by date
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostById(id: string): PostMeta | undefined {
  const posts = getPosts();
  return posts.find((p) => p.id === id);
}
