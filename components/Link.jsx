import { usePageContext } from 'vike-react/usePageContext'

export function Link ({ href, className = '', style, children, target }) {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href)
  const isExactActive = href === urlPathname
  return (
    <a href={href} className={`${className} ${isActive ? 'is-active' : ''} ${isExactActive ? 'is-exactactive' : ''}`} style={style} target={target}>
      {children}
    </a>
  )
}
