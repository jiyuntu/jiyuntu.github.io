import 'github-markdown-css/github-markdown-light.css'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="markdown-body">
        {children}
    </div>
  )
}