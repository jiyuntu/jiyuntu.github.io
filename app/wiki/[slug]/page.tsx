import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import 'github-markdown-css/github-markdown-light.css'
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  return [{ slug: 'example' }]
}

function getWikiContent(slug: string): string {
  const filePath = path.join(process.cwd(), "wiki", `${slug}.md`);
  try {
    const text = fs.readFileSync(filePath, "utf-8");
    // Remove frontmatter if present
    const match = text.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    return match ? match[1].trim() : text;
  } catch {
    return "Not found.";
  }
}

function WikiContent({ slug }: { slug: string }) {
  const content = getWikiContent(slug);
  return (
    <div className="markdown-body">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default async function WikiItemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return (
    <main>
      <article>
        <WikiContent slug={slug} />
      </article>
    </main>
  );
}
