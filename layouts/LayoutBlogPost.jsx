import '../css/index.js'

export function LayoutBlogPost ({ children }) {
  return (
    <div className='docs-layout-wrapper blog-post-layout'>
      <div className='docs-main-container'>
        {children}
      </div>
    </div>
  )
}
