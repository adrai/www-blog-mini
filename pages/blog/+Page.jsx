import { useState } from 'react'
import { Link } from '../../components/index.js'
import { useData } from 'vike-react/useData'

const POSTS_PER_PAGE = 9

export default function BlogPage () {
  const { posts } = useData()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div className='docs-landing-container'>
      {/* Hero Section */}
      <div className='docs-hero-section'>
        <div className='section-header-enhanced text-center' style={{ marginBottom: 0 }}>
          <h1 className='section-title-enhanced mt-0'>Blog</h1>
          <p className='section-subtitle-enhanced'>
            Insights, tutorials, and updates...
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className='blog-container'>
        {posts.length > 0
          ? (
            <>
              <div className='blog-posts-grid'>
                {currentPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
            )
          : (
            <div className='blog-empty-state'>
              <div className='empty-state-icon'>📝</div>
              <h3 className='empty-state-title'>No posts yet</h3>
              <p className='empty-state-description'>
                We're working on some great content. Check back soon!
              </p>
            </div>
            )}
      </div>
    </div>
  )
}

function BlogPostCard ({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Link href={`/blog/${post.slug}`} className='blog-post-card'>
      <div className='blog-post-thumbnail'>
        <img
          src={post.thumbnail || '/img/blog-default.svg'}
          alt={post.title}
          className='blog-post-image'
        />
        <div className='blog-post-category'>
          {post.category || 'Updates'}
        </div>
      </div>

      <div className='blog-post-content'>
        <h3 className='blog-post-title'>{post.title}</h3>
        <p className='blog-post-description'>{post.description}</p>

        <div className='blog-post-meta'>
          <span className='blog-post-date'>{formattedDate}</span>
          <span className='blog-post-read-time'>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}

function BlogPagination ({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className='blog-pagination'>
      <button
        className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <div className='pagination-numbers'>
        {pages.map(page => (
          <button
            key={page}
            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  )
}
