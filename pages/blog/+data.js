import { calculateReadTimeFromContent } from '../../src/readTimeCalculator.js'

// Import all MDX files at build time
const blogPosts = import.meta.glob('./posts/*.mdx', { eager: true })
const blogPostsRaw = import.meta.glob('./posts/*.mdx', { eager: true, query: '?raw', import: 'default' })

export async function data () {
  // Process all blog posts at build time
  const posts = Object.entries(blogPosts).map(([path, module]) => {
    const slug = path.replace('./posts/', '').replace('.mdx', '')
    const rawContent = blogPostsRaw[path] || ''
    const readTime = calculateReadTimeFromContent(rawContent)

    return {
      slug,
      title: module.frontmatter.title,
      description: module.frontmatter.description,
      date: module.frontmatter.date,
      category: module.frontmatter.category,
      thumbnail: module.frontmatter.thumbnail,
      readTime
    }
  })

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  console.log(`📝 Pre-generated ${sortedPosts.length} blog posts at build time`)

  return {
    posts: sortedPosts
  }
}
