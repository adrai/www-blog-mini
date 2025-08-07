import { useData } from 'vike-react/useData'

export default function Head () {
  const { post } = useData()

  return (
    <>
      <title>{`${post.title} - My Blog`}</title>
      <meta name='description' content={post.description} />
      <meta name='keywords' content={`My Site, ${post.tags ? post.tags.join(', ') : 'blog, tutorial'}`} />
    </>
  )
}
