import { useEffect, useState } from 'react'
import { useData } from 'vike-react/useData'

export default function BlogPostPage () {
  const { post } = useData()
  const [PostComponent, setPostComponent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true)
        const module = await import(`../posts/${post.slug}.mdx`)
        setPostComponent(() => module.default)
        setError(null)
      } catch (err) {
        console.error('Error loading blog post:', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [post.slug])

  // since +Head.jsx seems to be ignored... a vike bug?
  // useEffect(() => {
  //   document.title = `${post.title} - My Blog`

  //   // Set meta description
  //   let desc = document.querySelector('meta[name="description"]')
  //   if (!desc) {
  //     desc = document.createElement('meta')
  //     desc.name = 'description'
  //     document.head.appendChild(desc)
  //   }
  //   desc.content = post.description

  //   // Helper to set or create meta tag
  //   function setMeta (property, content, attr = 'property') {
  //     let tag = document.querySelector(`meta[${attr}="${property}"]`)
  //     if (!tag) {
  //       tag = document.createElement('meta')
  //       tag.setAttribute(attr, property)
  //       document.head.appendChild(tag)
  //     }
  //     tag.content = content
  //   }

  //   // Open Graph tags
  //   setMeta('og:title', post.title)
  //   setMeta('og:description', post.description)
  //   setMeta('og:type', 'article')

  //   // Article meta
  //   setMeta('article:published_time', post.date)
  //   setMeta('article:author', post.author)

  //   // Twitter tags (use 'name' instead of 'property')
  //   setMeta('twitter:card', 'summary_large_image', 'name')
  //   setMeta('twitter:title', post.title, 'name')
  //   setMeta('twitter:description', post.description, 'name')
  // }, [post])

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className='blog-post-page'>
      {/* Header Section */}
      <div className='blog-post-header'>
        <div className='blog-post-header-content'>
          <h1 className='blog-post-title'>
            {post.title}
          </h1>
          <div className='blog-post-meta-container'>
            <span className='blog-post-date'>
              {formattedDate}
            </span>
            <span className='blog-post-read-time'>
              {post.readTime}
            </span>
            <span className='blog-post-category-badge'>
              {post.category || 'Blog'}
            </span>
          </div>
        </div>
      </div>

      {/* Title Image */}
      <div className='blog-post-image-container'>
        <img
          src={post.thumbnail || '/img/blog-default.svg'}
          alt={post.title}
          className='blog-post-featured-image'
        />
      </div>

      {/* Blog Post Content */}
      <div className='blog-post-content-section'>
        <article className='blog-article-full-width'>
          {isLoading && <BlogPostContentSkeleton />}
          {error && (
            <div className='blog-error-state'>
              <p>Sorry, there was an error loading this blog post.</p>
            </div>
          )}
          {PostComponent && !isLoading && !error && <PostComponent />}
        </article>
      </div>

      {/* Back to Blog */}
      <div className='blog-post-back-section'>
        <a href='/blog' className='cta-secondary-enhanced'>
          ← Back to Blog
        </a>
      </div>
    </div>
  )
}

function BlogPostContentSkeleton () {
  return (
    <div className='skeleton-content'>
      <div className='skeleton-paragraph'>
        <div className='skeleton-line' />
        <div className='skeleton-line' />
        <div className='skeleton-line short' />
      </div>
      <div className='skeleton-heading' />
      <div className='skeleton-paragraph'>
        <div className='skeleton-line' />
        <div className='skeleton-line' />
      </div>
    </div>
  )
}
