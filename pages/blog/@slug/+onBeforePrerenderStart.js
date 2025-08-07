export async function onBeforePrerenderStart () {
  try {
    // import.meta.glob only runs at build-time
    // Adjust the pattern to match your posts directory structure
    const modules = import.meta.glob('../posts/*.mdx')

    console.log('🔍 Found modules:', Object.keys(modules))

    const slugs = Object.keys(modules).map((path) => {
      // e.g. '../posts/first.mdx' → 'first'
      return path.split('/').pop().replace('.mdx', '')
    })

    const urls = slugs.map((slug) => `/blog/${slug}`)

    console.log('📝 Blog posts to prerender:', urls)

    return urls
  } catch (error) {
    console.error('Error in onBeforePrerenderStart:', error)

    // Fallback to manual list
    return [
      // '/blog/second',
      // '/blog/first'
    ]
  }
}
