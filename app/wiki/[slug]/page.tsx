import { getWikiItems } from "@/lib/getWikiItems";

export async function generateStaticParams() {
  const wikiItems = getWikiItems();
  return wikiItems.map((item) => ({
    slug: item.filename,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const filePath = decodeURIComponent(slug);
  const { default: Post } = await import(`@/wiki/${filePath}`)

  return <Post />
}

export const dynamicParams = false