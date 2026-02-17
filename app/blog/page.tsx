import { getPosts } from "@/lib/getPosts";
import BlogClient from "./BlogClient";

export default function BlogPage() {
	const posts = getPosts();

	return (
		<div className="bg-white">
			<BlogClient posts={posts} />
		</div>
	);
}
