import { getPosts } from "@/lib/getPosts";

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}


export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { default: Post } = await import(`@/posts/${id}.md`)
 
  return <Post />
}
 
export const dynamicParams = false