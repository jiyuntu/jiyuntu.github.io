import { getPosts } from "../../lib/getPosts";
import styles from "./page.module.css";
import BlogClient from "./BlogClient";

export default function BlogPage() {
	const posts = getPosts();

	return (
		<div>
			<BlogClient posts={posts} />
		</div>
	);
}
