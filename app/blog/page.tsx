import { getPosts } from "@/lib/getPosts";
import { redirect } from "next/navigation";

export default function BlogPage() {
  const posts = getPosts();

  if (posts.length > 0) {
    redirect(`/blog/${posts[0].id}`);
  }

  return <div>No posts available</div>;
}