import { calculateReadTimeFromContent } from '../../../src/readTimeCalculator.js'
import { render } from 'vike/abort'
import { useConfig } from 'vike-react/useConfig'

// Import all MDX files at build time
const blogPosts = import.meta.glob('../posts/*.mdx', { eager: true })
const blogPostsRaw = import.meta.glob('../posts/*.mdx', { eager: true, query: '?raw', import: 'default' })

export async function data (pageContext) {
  const { slug } = pageContext.routeParams

  // Find the post by slug
  const postEntry = Object.entries(blogPosts).find(([path]) => {
    const postSlug = path.replace('../posts/', '').replace('.mdx', '')
    return postSlug === slug
  })

  if (!postEntry) {
    // Use Vike's proper 404 handling
    throw render(404, `Blog post not found: ${slug}`)
  }

  const [path, module] = postEntry

  // Get raw content for accurate read time calculation
  const rawContent = blogPostsRaw[path] || ''
  const calculatedReadTime = calculateReadTimeFromContent(rawContent)

  const post = {
    slug,
    ...module.frontmatter,
    readTime: calculatedReadTime
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const config = useConfig()

  config({
    title: `${post.title} - My Blog`,
    description: post.description
  })

  console.log(`📝 Pre-generated blog post data for: ${slug}`)

  // Only return serializable data, not the component
  return {
    post
  }
}
