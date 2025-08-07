import { usePageContext } from 'vike-react/usePageContext'
import { Link } from '../../components/Link.jsx'

export { Page }

function Page () {
  const { is404 } = usePageContext()

  if (is404) {
    return (
      <div className='error-page-container'>
        <div className='error-content'>
          <div className='error-icon'>🚀</div>
          <h1 className='error-title'>404 - Page Not Found</h1>
          <p className='error-description'>
            Looks like this page took a detour to another dimension. Let's get you back on track!
          </p>

          <div className='error-actions'>
            <Link href='/' className='cta-primary-enhanced'>
              <span>🏠</span>
              <span>Go Home</span>
            </Link>
            <Link href='/docs' className='cta-secondary-enhanced'>
              <span>📚</span>
              <span>Browse Docs</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='error-page-container'>
      <div className='error-content'>
        <div className='error-icon'>⚠️</div>
        <h1 className='error-title'>500 - Internal Server Error</h1>
        <p className='error-description'>
          Something went wrong on our end. Our team has been notified and we're working to fix it.
        </p>

        <div className='error-actions'>
          <Link href='/' className='cta-primary-enhanced'>
            <span>🏠</span>
            <span>Go Home</span>
          </Link>
          <Link href='/docs' className='cta-secondary-enhanced'>
            <span>📚</span>
            <span>Browse Docs</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
