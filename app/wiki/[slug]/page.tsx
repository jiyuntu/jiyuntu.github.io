import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import 'github-markdown-css/github-markdown-light.css'
import fs from "fs";
import path from "path";
import { getWikiItems } from "@/lib/getWikiItems";

export async function generateStaticParams() {
  const wikiItems = getWikiItems();
  return wikiItems.map((item) => ({
    slug: item.filename,
  }));
}

function getWikiContent(slug: string): string {
  const filePath = path.join(process.cwd(), "wiki", decodeURIComponent(slug));
  try {
    const text = fs.readFileSync(filePath, "utf-8");
    return text;
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
