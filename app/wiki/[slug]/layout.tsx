import 'github-markdown-css/github-markdown-light.css'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="markdown-body">
        {children}
    </div>
  )
}