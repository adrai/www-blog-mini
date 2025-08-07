import { useData } from 'vike-react/useData'

export default function Head () {
  const { post } = useData()

  return (
    <>
      <meta name='keywords' content={`My Site, ${post.tags ? post.tags.join(', ') : 'blog, tutorial'}`} />
    </>
  )
}
